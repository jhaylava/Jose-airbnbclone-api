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
    const token = req.cookies.jwt

    if (!token) {
      throw new Error('Invalid authentication token')
    }

    const decoded = jwt.verify(token, secret)

    const user_id = decoded.user_id

    const userSearch = `
      SELECT * FROM bookings
      WHERE user_id = '${user_id}'
      ORDER BY arrival_date DESC
    `

    const { rows } = await db.query(userSearch)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Define a GET route for fetching a specific booking by ID
router.get('/bookings/:booking_id', async (req, res) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      throw new Error('Invalid authentication token')
    }

    const decoded = jwt.verify(token, secret)

    const user_id = decoded.user_id
    const booking_id = req.params.booking_id

    const bookingSearch = `
      SELECT * FROM bookings
      WHERE booking_id = '${booking_id}'
    `

    const { rows } = await db.query(bookingSearch)

    if (rows.length === 0) {
      throw new Error('Booking not found')
    }

    const booking = rows[0]

    if (booking.user_id !== user_id) {
      throw new Error('You are not authorized')
    }

    res.json(booking)
  } catch (err) {
    console.error(err.message)
    res.json({ error: err.message })
  }
})

router.delete('/bookings/:booking_id', async (req, res) => {
  try {
    const { rowCount } = await db.query(
      `DELETE FROM bookings WHERE booking_id = ${req.params.booking_id}`
    )
    res.json(rowCount)
  } catch (error) {
    res.json({ error: err.message })
  }
})

// Export the router
export default router
