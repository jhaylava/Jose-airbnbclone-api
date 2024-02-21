import { Router } from 'express'
import db from '../db.js'
const router = Router()

// READ users data
router.get('/user', async (req, res) => {
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

// UPDATE users data
router.patch('/users/:user_id', async (req, res) => {
  console.log('user_id:', req.params.user_id)
  console.log('body:', req.body)
  try {
    const { rows } = await db.query(
      `UPDATE users 
      SET first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', 
      email = '${req.body.email}', password = '${req.body.password}', 
      profile_photo = '${req.body.profile_photo}' 
      WHERE user_id = ${req.params.user_id}
      RETURNING first_name, last_name, email, profile_photo
    `
    )
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})
export default router
