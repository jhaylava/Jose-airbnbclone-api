import { Router } from 'express'
const router = Router()

router.get('/houses', (req, res) => {
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
  res.json(houses)
})

router.get('/houses/1', (req, res) => {
  const house = {
    house_id: 1,
    location: 'Bangkok',
    price: 70,
    reviews: 'bunch of text',
    host: 'Lisa'
  }
  res.json(house)
})

export default router
