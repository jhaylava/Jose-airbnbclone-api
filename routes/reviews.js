import { Router } from 'express'
const router = Router()

// Define a GET route for fetching the list of reviews
router.get('/reviews', (req, res) => {
  res.send('List of reviews')
})

// Define a GET route for fetching a single review
router.get('/reviews/1', (req, res) => {
  res.send('Review number 1')
})