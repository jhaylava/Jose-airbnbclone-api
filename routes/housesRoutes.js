import { Router } from 'express'
const router = Router()

router.get('/houses', (req, res) => {
  res.send([
    {
      house_id: 1,
      location: 'Bangkok',
      price: 70,
      reviews: 'bunch of text',
      host: 2
    }
  ])
})

export default router
