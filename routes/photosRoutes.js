import { Router } from 'express'
import db from '../db.js'
const router = Router()

// Post to photos data
router.post('/photos', async (req, res) => {
  const url = req.body.url
  const house_id = req.body.house_id

  console.log({ url, house_id })

  const queryString = `
  INSERT INTO photos ( url, house_id) VALUES ('${url}', ${house_id})
  RETURNING * `

  console.log(queryString)

  try {
    const { rows } = await db.query(queryString)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Route to access all photos data
router.get('/photos', async (req, res) => {
  try {
    const { house } = req.query
    const houseSearch = `
      SELECT * FROM photos
    `
    const { rows } = await db.query(houseSearch)
    console.log(houseSearch)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json({ error: 'we are down' })
  }
})

// Route to access data of a specific photo (photo_id = 1)
router.get('/photos/:photo_id', async (req, res) => {
  // Sample data for a specific house
  const numbId = Number(req.params.photo_id)
  try {
    if (!numbId) {
      throw new Error(`photo id most be a number`)
    }
    const result = await db.query(
      `SELECT * FROM photos WHERE photos.photo_id = ${numbId}`
    )
    // Send the specific photo data as JSON response
    let resultArr = result.rows
    if (!resultArr.length) {
      throw new Error(`Sorry, photo not found`)
    }
    res.json(resultArr[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

// PATCH: Route for clients to update existing data

export default router
