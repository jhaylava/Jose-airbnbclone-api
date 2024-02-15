import { Router } from 'express'
const router = Router()

router.get('/signup', (req, res) => {
  res.send('List of signups')
})

router.get('/signup/1', (req, res) => {
  res.send('Hello from SignUp')
})

router.get('/login', (req, res) => {
  res.send('List of login')
})
router.get('/login/1', (req, res) => {
  res.send('Hello from Login')
})

router.get('/logout', (req, res) => {
  res.send('List of logout')
})
router.get('/login/1', (req, res) => {
  res.send('Hello from Logout')
})

export default router
