import { Router } from 'express'
const router = Router()

router.get('/signup', (req, res) => {
  res.send('List of signups')
})

router.get('/signup/1', (req, res) => {
  res.send('Hello from SignUp')
})

export default router
