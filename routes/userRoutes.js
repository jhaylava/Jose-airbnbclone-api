import { Router } from 'express'
import db from '../db.js'
const router = Router()

// UPDATE users data

//READ users data
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

router.get('/users/:user_Id', async (req, res) => {
  try {
    let numId = Number(req.params.user_Id)
    if (!numId) {
      throw new Error('User ID must be a number')
    }
    const query = await db.query(
      `SELECT * FROM users WHERE users.user_id = ${numId}`
    )
    const usersArray = query.rows
    if (usersArray.length === 0) {
      throw new Error(`Sorry user ${numId} does not exist`)
    }
    res.json(usersArray[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
