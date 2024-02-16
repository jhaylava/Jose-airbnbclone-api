import { Router, query } from 'express'
import db from '../db.js'
const router = Router()

// Define a GET route for fetching the list of reviews
router.get('/reviews', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * From reviews')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json({ error: 'we are down' })
  }
})

// Define a GET route for fetching a single review
router.get('/reviews/1', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM reviews WHERE review_id = 1')
    console.log(rows[0])
    res.json(rows[0])
  } catch (err) {
    console.error(err.message)
    res.json({ error: 'we are down' })
  }
})

// Export the router
export default router
