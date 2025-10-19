/**
 * MongoDB Connection Test Script
 * 
 * This script tests your MongoDB Atlas connection before deploying.
 * 
 * Usage:
 *   deno run --allow-net --allow-env test-connection.ts
 * 
 * What it tests:
 *   1. Can connect to MongoDB Atlas
 *   2. Can access the database
 *   3. Can create/read/delete test documents
 */

import { MongoClient } from 'npm:mongodb@6.3.0'
import { MONGODB_URI, DB_NAME, COLLECTION_NAME } from './mongodb.ts'

async function testConnection() {
  console.log('🔍 Testing MongoDB Atlas Connection...\n');
  
  // Check if URI is configured
  if (MONGODB_URI === 'YOUR_MONGODB_ATLAS_CONNECTION_STRING') {
    console.error('❌ ERROR: MongoDB URI not configured!');
    console.log('\nPlease update /api/mongodb.ts with your MongoDB Atlas connection string.');
    console.log('See MONGODB_SETUP.md for instructions.\n');
    Deno.exit(1);
  }

  let client: MongoClient | null = null;

  try {
    // Step 1: Connect to MongoDB
    console.log('Step 1: Connecting to MongoDB Atlas...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Step 2: Test database access
    console.log('Step 2: Testing database access...');
    const db = client.db(DB_NAME);
    await db.admin().ping();
    console.log(`✅ Database "${DB_NAME}" is accessible!\n`);

    // Step 3: Test collection operations
    console.log('Step 3: Testing collection operations...');
    const collection = db.collection(COLLECTION_NAME);

    // Insert test document
    const testDoc = {
      guestName: 'Test User',
      phoneNumber: '+1234567890',
      attendance: 'yes',
      guestOption: 'just-me',
      guestNames: '',
      dietaryRestrictions: 'None',
      message: 'This is a test RSVP',
      submittedAt: new Date(),
      updatedAt: new Date(),
      _test: true // Mark as test document
    };

    const insertResult = await collection.insertOne(testDoc);
    console.log('✅ Successfully inserted test document');
    console.log(`   Document ID: ${insertResult.insertedId}\n`);

    // Read test document
    const foundDoc = await collection.findOne({ _test: true });
    if (foundDoc) {
      console.log('✅ Successfully read test document');
      console.log(`   Guest: ${foundDoc.guestName}\n`);
    } else {
      throw new Error('Could not find test document');
    }

    // Delete test document
    const deleteResult = await collection.deleteOne({ _test: true });
    console.log('✅ Successfully deleted test document');
    console.log(`   Deleted count: ${deleteResult.deletedCount}\n`);

    // Step 4: Get collection stats
    console.log('Step 4: Getting collection statistics...');
    const count = await collection.countDocuments({});
    console.log(`✅ Collection "${COLLECTION_NAME}" has ${count} real RSVPs\n`);

    // Success summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ ALL TESTS PASSED!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYour MongoDB Atlas connection is working correctly!');
    console.log('\nNext steps:');
    console.log('  1. Deploy your backend (see DEPLOYMENT_GUIDE.md)');
    console.log('  2. Update frontend API endpoint');
    console.log('  3. Test RSVP submission on your website\n');

  } catch (error) {
    console.error('\n❌ TEST FAILED!\n');
    console.error('Error details:', error.message);
    console.error('\nCommon issues:');
    console.error('  1. Incorrect connection string');
    console.error('  2. Wrong database username/password');
    console.error('  3. IP address not whitelisted');
    console.error('  4. Network connectivity issues');
    console.error('\nSee MONGODB_SETUP.md for troubleshooting help.\n');
    Deno.exit(1);
  } finally {
    // Close connection
    if (client) {
      await client.close();
      console.log('🔒 Connection closed.\n');
    }
  }
}

// Run the test
if (import.meta.main) {
  testConnection();
}
