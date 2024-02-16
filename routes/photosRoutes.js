import { Router } from 'express'
import db from '../db.js'
const router = Router()
// Route to access all photos data
router.get('/users', async (req, res) => {
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
router.get('/photos/1', (req, res) => {
  // Sample data for a specific photo
  const photo = { photo_id: 1, photo1: 'url', photo2: 'url', photo3: 'url' }
  // Send the specific photo data as JSON response
  res.json(photo)
})
export default router
