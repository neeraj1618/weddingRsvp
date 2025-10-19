import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { MongoClient, ObjectId } from 'npm:mongodb@6.3.0'
import { MONGODB_URI, DB_NAME, COLLECTION_NAME } from './mongodb.ts'

const app = new Hono()

// MongoDB client setup
let mongoClient: MongoClient | null = null;

async function getMongoClient() {
  if (!mongoClient) {
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    console.log('Connected to MongoDB Atlas');
  }
  return mongoClient;
}

async function getCollection() {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION_NAME);
}

app.use(
  '/*',
  cors({
    origin: ['*'],
    allowHeaders: ['*'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  })
)

app.use('*', logger(console.log))

// Health check endpoint
app.get('/health', async (c) => {
  try {
    // Check MongoDB connection
    const client = await getMongoClient();
    await client.db().admin().ping();
    
    return c.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      message: 'Wedding RSVP server is running!',
      database: 'MongoDB Atlas connected'
    })
  } catch (error) {
    return c.json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error.message
    }, 500)
  }
})

// Submit RSVP
app.post('/rsvp', async (c) => {
  try {
    const { guestName, phoneNumber, attendance, guestOption, guestNames, dietaryRestrictions, message } = await c.req.json()
    
    // Validate required fields
    if (!guestName || !phoneNumber || !attendance) {
      return c.json({ error: 'Guest name, phone number, and attendance status are required' }, 400)
    }

    // Create RSVP entry with timestamp
    const rsvpData = {
      guestName,
      phoneNumber,
      attendance,
      guestOption: guestOption || 'just-me',
      guestNames: guestNames || '',
      dietaryRestrictions: dietaryRestrictions || '',
      message: message || '',
      submittedAt: new Date(),
      updatedAt: new Date()
    }

    // Get MongoDB collection
    const collection = await getCollection();
    
    // Check if RSVP already exists for this phone number
    const existingRsvp = await collection.findOne({ phoneNumber });
    
    let result;
    if (existingRsvp) {
      // Update existing RSVP
      result = await collection.updateOne(
        { phoneNumber },
        { $set: { ...rsvpData, updatedAt: new Date() } }
      );
      console.log('RSVP updated successfully:', rsvpData);
      
      return c.json({ 
        success: true, 
        message: 'Your RSVP has been updated! We can\'t wait to celebrate with you.',
        rsvpId: existingRsvp._id.toString(),
        updated: true
      })
    } else {
      // Insert new RSVP
      result = await collection.insertOne(rsvpData);
      console.log('RSVP saved successfully:', rsvpData);
      
      return c.json({ 
        success: true, 
        message: 'Thank you for your RSVP! We can\'t wait to celebrate with you.',
        rsvpId: result.insertedId.toString(),
        updated: false
      })
    }
    
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return c.json({ 
      error: 'Failed to save RSVP. Please try again.',
      details: error.message 
    }, 500)
  }
})

// Get all RSVPs (for wedding planning purposes)
app.get('/rsvps', async (c) => {
  try {
    const collection = await getCollection();
    const rsvps = await collection.find({}).sort({ submittedAt: -1 }).toArray();
    
    return c.json({ 
      success: true,
      count: rsvps.length,
      rsvps 
    })
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return c.json({ 
      error: 'Failed to fetch RSVPs',
      details: error.message
    }, 500)
  }
})

// Check if phone number already RSVPed
app.get('/rsvp/:phoneNumber', async (c) => {
  try {
    const phoneNumber = c.req.param('phoneNumber')
    const collection = await getCollection();
    const rsvp = await collection.findOne({ phoneNumber });
    
    if (rsvp) {
      return c.json({ 
        exists: true, 
        rsvp: {
          ...rsvp,
          _id: rsvp._id.toString()
        }
      })
    } else {
      return c.json({ exists: false })
    }
  } catch (error) {
    console.error('Error checking RSVP:', error);
    return c.json({ 
      error: 'Failed to check RSVP status',
      details: error.message
    }, 500)
  }
})

// Get RSVP statistics
app.get('/stats', async (c) => {
  try {
    const collection = await getCollection();
    
    const totalRsvps = await collection.countDocuments({});
    const attending = await collection.countDocuments({ attendance: 'yes' });
    const notAttending = await collection.countDocuments({ attendance: 'no' });
    
    // Count total guests (including +1s)
    const attendingRsvps = await collection.find({ attendance: 'yes' }).toArray();
    let totalGuests = 0;
    
    attendingRsvps.forEach(rsvp => {
      switch (rsvp.guestOption) {
        case 'just-me':
          totalGuests += 1;
          break;
        case 'plus-one':
          totalGuests += 2;
          break;
        case 'plus-two':
          totalGuests += 3;
          break;
        case 'plus-three':
          totalGuests += 4;
          break;
        case 'family':
          totalGuests += 5; // Minimum for family/group
          break;
        default:
          totalGuests += 1;
      }
    });
    
    return c.json({
      success: true,
      stats: {
        totalRsvps,
        attending,
        notAttending,
        totalGuests,
        responseRate: totalRsvps > 0 ? Math.round((totalRsvps / 100) * 100) : 0
      }
    })
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ 
      error: 'Failed to fetch statistics',
      details: error.message
    }, 500)
  }
})

// Graceful shutdown
Deno.addSignalListener("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  if (mongoClient) {
    await mongoClient.close();
  }
  Deno.exit(0);
});

Deno.serve(app.fetch)
