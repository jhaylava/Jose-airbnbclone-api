import { Router } from 'express'
const router = Router()

// Define a GET route for fetching the list of reviews
router.get('/bookings', (req, res) => {
  const bookings = [
    {
      review_id: 1,
      user_id: 2,
      house_id: 34,
      rating: 4.5,
      comment: 'it was a great property',
      date: '2023-01-21'
    }
  ]
  res.send(bookings)
})

// Define a GET route for fetching a single review
router.get('/bookings/1', (req, res) => {
  res.send({
    bookings
  })
})

// Export the router
export default router
