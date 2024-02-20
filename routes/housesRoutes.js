import { Router } from 'express'
import db from '../db.js'
const router = Router()

// Route to access all houses data
router.get(
  '/houses',
  async (req, res) => {
    // Sample data for houses
    const result = await db.query('SELECT * FROM houses')
    if (req.query.location) {
      db.query(
        `SELECT * FROM houses WHERE houses.location LIKE %${req.query.location}%; AND houses.price > ${req.query.max_price};`
      )
    } else if (req.query.location) {
      db.query(`SELECT * FROM houses WHERE houses.location`)
    } else {
      db.query(`SELECT * FROM houses`)
    }
    res.json(rows)
  }
  /* try {
    const result = await db.query('SELECT * FROM houses')
    // Send the houses data as JSON response
    res.json(result.rows)
  } catch (err) {
    res.json({ error: err.message })
  } */
)
// Route to access data of a specific house (house_id = 1)
router.get('/houses/:house_id', async (req, res) => {
  // Sample data for a specific house
  const numbId = Number(req.params.house_id)
  try {
    if (!numbId) {
      throw new Error(`house id most be a number`)
    }
    const result = await db.query(
      `SELECT * FROM houses WHERE houses.house_id = ${numbId}`
    )
    // Send the specific house data as JSON response
    let resultArr = result.rows
    if (!resultArr.length) {
      throw new Error(`Sorry, house not found`)
    }
    res.json(resultArr[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
