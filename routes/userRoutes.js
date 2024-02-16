import { Router } from 'express'
const router = Router()

router.get('/users', (req, res) => {
  const users = [
    {
      id: 1,
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bobsmith@gmail.com',
      password: '1234BOB',
      profile:
        'https://unsplash.com/photos/man-wearing-henley-top-portrait-7YVZYZeITc8'
    },
    {
      id: 2,
      firstName: 'Alice',
      lastName: 'Wonderland',
      email: 'aliceinwonderland@gmail.com',
      pasword: '1234ALICE',
      profile:
        'https://unsplash.com/photos/shallow-focus-photography-of-woman-outdoor-during-day-rDEOVtE7vOs'
    }
  ]
  res.json(users)
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

  res.json(user)
})

export default router