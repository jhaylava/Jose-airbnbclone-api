import { Router } from 'express'
import { db } from '../db.js'
const router = Router()

// Route to access all houses data
router.get('/houses', (req, res) => {
  // Sample data for houses
  const houses = [
    {
      house_id: 1,
      location: 'Bangkok',
      price: 70,
      reviews: 'bunch of text',
      host: 'Lisa'
    },
    {
      house_id: 2,
      location: 'Chiang Mai',
      price: 40,
      reviews: 'bunch of text and more',
      host: 'Nam'
    },
    {
      house_id: 3,
      location: 'Phuket',
      price: 150,
      reviews: 'bunch of text, clubs, food and crazy mess',
      host: 'Smirnoff'
    }
  ]
  // Send the houses data as JSON response
  res.json(houses)
})
// Route to access data of a specific house (house_id = 1)
router.get('/houses/1', (req, res) => {
  // Sample data for a specific house
  const house = {
    house_id: 1,
    location: 'Bangkok',
    price: 70,
    reviews: 'bunch of text',
    host: 'Lisa'
  }
  // Send the specific house data as JSON response
  res.json(house)
})

export default router
