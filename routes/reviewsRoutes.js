import { Router } from 'express'
import db from '../db.js'
const router = Router()

// Post to reviews data
router.post('/reviews', async (req, res) => {
  const user_id = req.body.user_id
  const house_id = req.body.house_id
  const rating = req.body.rating
  const content = req.body.content
  const date = req.body.date

  console.log(user_id, house_id, rating, content, date)

  const queryString = `
  INSERT INTO reviews (user_id, house_id, rating, content, date) VALUES (${user_id}, ${house_id}, ${rating}, '${content}', '${date}')
  RETURNING * `

  console.log(queryString)

  try {
    const { rows } = await db.query(queryString)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

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
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json({ error: 'we are down' })
  }
})

// Define a GET route for fetching a single review
router.get('/reviews/:review_id', async (req, res) => {
  const numbId = Number(req.params.review_id)
  try {
    if (!numbId) {
      throw new Error(`Review id most be a number`)
    }
    const result = await db.query(
      `SELECT * FROM reviews WHERE review_id = ${numbId}`
    )
    let resultArr = result.rows
    if (!resultArr.length) {
      throw new Error(`Sorry, review not found`)
    }
    res.json(resultArr[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

// DELETE route for reviews
router.delete('/reviews/:review_id', async (req, res) => {
  const { rowCount } = await db.query(`
  DELETE FROM reviews WHERE review_id = ${req.params.review_id}
  `)
  if (!rowCount) {
    throw new Error('Delete Failed')
  }
  console.log(rowCount)
  res.json(rowCount)
})
// Export the router
export default router
