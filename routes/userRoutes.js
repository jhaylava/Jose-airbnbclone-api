import { Router } from 'express'
import db from '../db.js'
const router = Router()

router.get('/users', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users') // query the database
    console.log(rows)
    res.json(rows) // respond with the data
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

router.get('/users/1', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE user_id = 1')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

export default router
