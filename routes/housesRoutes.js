import { Router } from 'express'
const router = Router()
import db from '../db.js'

// Route to access all houses data
router.get('/houses', async (req, res) => {
  // Sample data for houses
  try {
    const result = await db.query('SELECT * FROM houses')
    // Send the houses data as JSON response
    res.json(result.rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})
// Route to access data of a specific house (house_id = 1)
router.get('/houses/1', async (req, res) => {
  // Sample data for a specific house
  try {
    const result = await db.query(
      'SELECT * FROM houses WHERE houses.house_id = 1'
    )
    // Send the specific house data as JSON response
    res.json(result.rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
