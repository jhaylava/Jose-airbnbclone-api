import { Router } from 'express'
import db from '../db.js'
const router = Router()
// Route to access all photos data
router.get('/photos', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM photos') // query the database
    console.log(rows)
    res.json(rows) // respond with the data
  } catch (err) {
    console.error(err.message)
    res.json(err)
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

export default router
