import { Router } from 'express'
import db from '../db.js'
const router = Router()
// Route to access all photos data
router.get('/photos', async (req, res) => {
  try {
    const { house } = req.query
    const houseSearch = `
      SELECT * FROM photos
      WHERE house_id = $1
    `
    const { rows } = await db.query(houseSearch, [house])
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json({ error: 'we are down' })
  }
})

// Route to access data of a specific photo (photo_id = 1)
router.get('/photos/:photo_Id', async (req, res) => {
  try {
    let numId = Number(req.params.photo_Id)
    if (!numId) {
      throw new Error('Photo ID must be a number')
    }
    const query = await db.query(
      `SELECT * FROM photos WHERE photos.photo_id = ${numId}`
    )
    const photosArray = query.rows
    if (photosArray.length === 0) {
      throw new Error(`Sorry photo ${numId} does not exist`)
    }
    res.json(photosArray[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
