import { Router } from 'express'
import db from '../db.js'
const router = Router()

// Route to access all houses data
router.get('/houses', async (req, res) => {
  // Sample data for houses
  let queryString = 'SELECT * FROM houses'

  try {
    if (
      req.query.location ||
      req.query.max_price ||
      req.query.min_rooms ||
      req.query.search
    ) {
      queryString += ' WHERE'
    }
    if (req.query.location) {
      queryString += ` houses.location ILIKE '%${req.query.location}%' AND`
    }
    if (req.query.max_price) {
      queryString += ` houses.nightly_price <= '${req.query.max_price}' AND`
    }
    if (req.query.search) {
      queryString += ` houses.description ILIKE '%${req.query.search}%' AND`
    }
    if (req.query.min_rooms) {
      queryString += ` houses.bedrooms >= '${req.query.min_rooms}' AND`
    }
    if (req.query.sort && req.query.order) {
      queryString += ` ORDER BY houses.${req.query.sort} ${req.query.order}`
    }

    if (queryString.endsWith('AND')) {
      queryString = queryString.slice(0, -4)
    }

    const result = await db.query(queryString)

    res.json(result.rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})
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
