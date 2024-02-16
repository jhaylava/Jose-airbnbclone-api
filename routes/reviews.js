import { Router } from 'express'
const router = Router()

// Define a GET route for fetching the list of reviews
router.get('/reviews', (req, res) => {
  const reviews = [
    {
      review_id: 1,
      user_id: 2,
      house_id: 34,
      rating: 4.5,
      comment: 'it was a great property',
      date: '2023-01-21'
    },
    {
      review_id: 2,
      user_id: 4,
      house_id: 34,
      rating: 4.0,
      comment: 'Awesome location',
      date: '2024-02-02'
    }
  ]
  res.send(reviews)
})

// Define a GET route for fetching a single review
router.get('/reviews/1', (req, res) => {
  res.send({
    review_id: 1,
    user_id: 2,
    house_id: 34,
    rating: 4.5,
    comment: 'it was a great property',
    date: '2023-01-21'
  })
})

// Export the router
export default router
