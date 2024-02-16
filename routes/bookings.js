import { Router } from 'express'
import db from '../db.js'
const router = Router()

// Define a GET route for fetching the list of reviews
router.get('/bookings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM bookings')
    res.json(result)
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Define a GET route for fetching a single review
router.get('/bookings/1', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT * FROM bookings WHERE bookings.booking_id = 1'
    )
    const bookingsArray = query.rows
    res.json(bookingsArray[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Export the router
export default router
