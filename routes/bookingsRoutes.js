import { Router } from 'express'
import db from '../db.js'
const router = Router()

// Define a GET route for fetching the list of reviews
router.post('/bookings', async (req, res) => {})

// Define a GET route for fetching the list of bookings
router.get('/bookings', async (req, res) => {
  try {
    const { user } = req.query
    const userSearch = `
      SELECT * FROM bookings
      WHERE user_id = $1
      ORDER BY bookings.arrival_date DESC
    `
    const { rows } = await db.query(userSearch, [user])
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json({ error: 'we are down' })
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
