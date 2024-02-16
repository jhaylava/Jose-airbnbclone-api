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
router.get('/photos/1', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM photos WHERE photo_id = 1')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    // send specific photo data as JSON response
    res.json(err)
  }
})

export default router
