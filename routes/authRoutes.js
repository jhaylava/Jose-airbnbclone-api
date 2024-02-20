import { Router } from 'express'
import db from '../db.js'
const router = Router()

router.post('/signup', (req, res) => {
  res.send('Hello from Signup')
})

router.get('/login', (req, res) => {
  res.send('Hello from Login')
})

router.get('/logout', (req, res) => {
  res.send('Hello from Logout')
})

export default router
