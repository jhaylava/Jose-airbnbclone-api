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
router.get('/bookings/:booking_id', async (req, res) => {
  try {
    let numbId = Number(req.params.booking_id)
    if (!numbId) {
      throw new Error('bookingId most be a number')
    }
    const query = await db.query(
      `SELECT * FROM bookings WHERE bookings.booking_id = ${numbId}`
    )
    const bookingsArray = query.rows
    if (bookingsArray.length === 0) {
      throw new Error(`Sorry booking ${numbId} does not exist`)
    }
    res.json(bookingsArray[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Export the router
export default router
