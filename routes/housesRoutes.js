import { Router, query } from 'express'
const router = Router()
import db from '../db.js'

// Route to access all houses data
router.get('/houses', async (req, res) => {
  // Sample data for houses
  let queryString = 'SELECT * FROM houses'
  try {
    if (req.query.location) {
      queryString += ` WHERE houses.location ILIKE '${req.query.location}'`
    }
    if (req.query.max_price) {
      queryString += ` AND houses.nightly_price <= '${req.query.max_price}'`
    }
    if (req.query.search) {
      queryString += ` AND houses.description ILIKE '%${req.query.search}%'`
    }
    if (req.query.sort) {
      let orderDescendent = 'DESC'
      queryString += ` ORDER BY houses.nightly_price`
      if (req.query.order) {
        queryString += ` ${orderDescendent}`
      }
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
