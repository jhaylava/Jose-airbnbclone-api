import { Router } from 'express'
const router = Router()
//This is the route that acces to all photos data"
router.get('/photos', (req, res) => {
  const photos = [
    { photo_id: 1, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 2, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 3, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 4, photo1: 'url', photo2: 'url', photo3: 'url' }
  ]
  res.json(photos)
})
//This is the route that acces to each photo data"
router.get('/photos/1', (req, res) => {
  const photo = { photo_id: 1, photo1: 'url', photo2: 'url', photo3: 'url' }
  res.json(photo)
})
export default router
