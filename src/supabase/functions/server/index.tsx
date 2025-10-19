import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

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
app.get('/make-server-e9284329/health', async (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Wedding RSVP server is running!'
  })
})

// Submit RSVP
app.post('/make-server-e9284329/rsvp', async (c) => {
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
      submittedAt: new Date().toISOString(),
      id: `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    // Store in KV store with phone number as part of key for easy retrieval
    await kv.set(`wedding_rsvp_${phoneNumber.replace(/\D/g, '')}`, rsvpData)
    
    console.log('RSVP saved successfully:', rsvpData)
    
    return c.json({ 
      success: true, 
      message: 'Thank you for your RSVP! We can\'t wait to celebrate with you.',
      rsvpId: rsvpData.id
    })
    
  } catch (error) {
    console.log('Error saving RSVP:', error)
    return c.json({ error: 'Failed to save RSVP. Please try again.' }, 500)
  }
})

// Get all RSVPs (for wedding planning purposes)
app.get('/make-server-e9284329/rsvps', async (c) => {
  try {
    const rsvps = await kv.getByPrefix('wedding_rsvp_')
    return c.json({ rsvps })
  } catch (error) {
    console.log('Error fetching RSVPs:', error)
    return c.json({ error: 'Failed to fetch RSVPs' }, 500)
  }
})

// Check if phone number already RSVPed
app.get('/make-server-e9284329/rsvp/:phoneNumber', async (c) => {
  try {
    const phoneNumber = c.req.param('phoneNumber')
    const rsvp = await kv.get(`wedding_rsvp_${phoneNumber.replace(/\D/g, '')}`)
    
    if (rsvp) {
      return c.json({ exists: true, rsvp })
    } else {
      return c.json({ exists: false })
    }
  } catch (error) {
    console.log('Error checking RSVP:', error)
    return c.json({ error: 'Failed to check RSVP status' }, 500)
  }
})

Deno.serve(app.fetch)