import { Router } from 'express'
import db from '../db.js'
const router = Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../secrets.js'

router.post('/signup', async (req, res) => {
  try {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const password = req.body.password
    const profile_photo = req.body.profile_photo

    // create salt
    const salt = await bcrypt.genSalt(10)
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, salt)
    const queryString = ` INSERT INTO users ( first_name, last_name, email, password, profile_photo) 
    VALUES ('${first_name}', '${last_name}', '${email}', '${hashedPassword}', '${profile_photo}' )
  RETURNING * `
    //
    const { rows } = await db.query(queryString)
    const user = rows[0]
    const simpleUser = {
      user_id: user.user_id,
      email: user.email
    }

    let token = jwt.sign(simpleUser, jwtSecret)

    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const queryString = `SELECT * FROM users WHERE users.email = '${email}' AND users.password = '${password}'`
  try {
    const { rows } = await db.query(queryString)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwt')
  res.send('You are logged out')
})

export default router
