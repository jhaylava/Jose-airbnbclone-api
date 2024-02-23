import { Router } from 'express'
import db from '../db.js'
import jwt from 'jsonwebtoken'
import secret from '../secrets.js'
const router = Router()

// Define a POST route for creating a list of bookings
router.post('/bookings', async (req, res) => {
  try {
    let decoded = jwt.verify(req.cookies.jwt, secret)
    const { house_id, user_id, price, arrival_date, departure_date, comment } =
      req.body
    const { rows } =
      await db.query(`INSERT INTO bookings ( house_id, user_id, price, arrival_date, departure_date, comment)
    VALUES (${house_id.house_id}, ${decoded.user_id}, ${price.price},'${arrival_date.arrival_date}', '${departure_date.departure_date}', '${comment.comment}')
    RETURNING * `)
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
