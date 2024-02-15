import { Router } from 'express'
const router = Router()

router.get('/users', (req, res) => {
  res.send('List of users')
})

router.get('/users/1', (req, res) => {
  res.send('User number 1')
})
export default router
