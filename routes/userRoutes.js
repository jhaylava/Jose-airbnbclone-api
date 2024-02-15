import { Router } from 'express'
const router = Router()

router.get('/users', (req, res) => {
  const users = [
    { id: 1, firstName: 'Bob' },
    { id: 2, firstName: 'Alice' }
  ]
  res.send('List of users')
})

router.get('/users/1', (req, res) => {
  const user = {
    id: 1,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bobsmith@gmail.com',
    password: '1234BOB',
    profile:
      'https://www.fakepersongenerator.com/Face/male/male20161083948806152.jpg'
  }

  res.send(user)
})

export default router
