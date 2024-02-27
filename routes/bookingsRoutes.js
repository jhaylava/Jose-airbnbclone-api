import { Router } from 'express'
import db from '../db.js'
import jwt from 'jsonwebtoken'
import { secret } from '../secrets.js'
const router = Router()

// Define a POST route for creating a list of bookings
router.post('/bookings', async (req, res) => {
  const house_id = req.body.house_id
  const user_id = req.body.user_id
  const price = req.body.price
  const arrival_date = req.body.arrival_date
  const departure_date = req.body.departure_date
  const comment = req.body.comment
  const queryString = `
    INSERT INTO bookings ( house_id, user_id, price, arrival_date, departure_date, comment)
    VALUES (${house_id}, ${user_id}, ${price},'${arrival_date}', '${departure_date}', '${comment}')
    RETURNING * `
  console.log(queryString)
  try {
    const { rows } = await db.query(queryString)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

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

router.delete('/bookings/:booking_id', async (req, res) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      throw new Error('Invalid authentication token')
    }
    const decoded = jwt.verify(token, secret)
    const bookingId = req.params.booking_id
    const query = `SELECT * FROM bookings WHERE booking_id = ${bookingId}`
    const result = await db.query(query)
    const booking = result.rows[0]

    if (!booking) {
      throw new Error(`Booking with ID ${bookingId} not found`)
    }

    if (booking.user_id !== decoded.user_id) {
      throw new Error('You are not authorized to delete this booking')
    }
    const { rowCount } = await db.query(
      `DELETE FROM bookings WHERE booking_id = ${bookingId}`
    )
    res.json(rowCount)
  } catch (error) {
    res.json({ error: error.message })
  }
})

// Export the router
export default router
