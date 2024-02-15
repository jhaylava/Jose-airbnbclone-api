import { Router } from 'express'
const router = Router()

router.get('/houses', (req, res) => {
  res.send([
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
  ])
})

router.get('/houses/1', (req, res) => {
  res.send({
    house_id: 1,
    location: 'Bangkok',
    price: 70,
    reviews: 'bunch of text',
    host: 'Lisa'
  })
})

export default router
