import { Router } from 'express'
const router = Router()

// Define a GET route for fetching the list of reviews
router.get('/bookings', (req, res) => {
  const bookings = [
    {
      booking_id: 1,
      house_id: 2,
      guest_id: 1,
      host_id: 34,
      date_start: '2024-02-20',
      date_end: '2024-02-22',
      total_nights: 2,
      price_daily: 24,
      price_total: 48,
      message: 'Cant wait to explore your island'
    },
    {
      booking_id: 2,
      house_id: 2,
      guest_id: 3,
      host_id: 34,
      date_start: '2024-03-01',
      date_end: '2024-03-05',
      total_nights: 4,
      price_daily: 24,
      price_total: 96,
      message: 'Looking forward to the stay'
    }
  ]
  res.json(bookings)
})

// Define a GET route for fetching a single review
router.get('/bookings/1', (req, res) => {
  res.json({
    booking_id: 1,
    house_id: 2,
    guest_id: 1,
    host_id: 34,
    date_start: '2024-02-20',
    date_end: '2024-02-22',
    total_nights: 2,
    price_daily: 24,
    price_total: 48,
    message: 'Cant wait to explore your island'
  })
})

// Export the router
export default router
