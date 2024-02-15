import { Router } from 'express'
const router = Router()

// Define a GET route for fetching the list of reviews
router.get('/reviews', (req, res) => {
  res.send('List of reviews')
})