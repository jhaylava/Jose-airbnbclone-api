import { Router } from 'express'
import db from '../db.js'
const router = Router()

// Define a GET route for fetching the list of reviews
router.get('/reviews', async (req, res) => {
  console.log(req.query)
  try {
    const { house } = req.query
    const houseSearch = `
      SELECT * FROM reviews
      WHERE house_id = $1
    `
    const { rows } = await db.query(houseSearch, [house])
    res.json(rows[0])

    /* const { rows } = await db.query('SELECT * From reviews')
    console.log(rows)
    res.json(rows) */
  } catch (err) {
    console.error(err.message)
    res.json({ error: 'we are down' })
  }
})

// Define a GET route for fetching a single review
router.get('/reviews/:review_Id', async (req, res) => {
  try {
    let numId = Number(req.params.review_Id)
    if (!numId) {
      throw new Error('User ID must be a number')
    }
    const query = await db.query(
      `SELECT * FROM reviews WHERE reviews.review_id = ${numId}`
    )
    const reviewsArray = query.rows
    if (reviewsArray.length === 0) {
      throw new Error(`Sorry review ${numId} does not exist`)
    }
    res.json(reviewsArray[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Export the router
export default router
