import { Router } from 'express'
const router = Router()
//This the route that acces to all photos data"
router.get('/photos', (req, res) => {
  res.json([
    { photo_id: 1, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 2, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 3, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 4, photo1: 'url', photo2: 'url', photo3: 'url' }
  ])
})
//This is the route that acces to each photo data"
router.get('/photos/1', (req, res) => {
  res.json({ photo_id: 1, photo1: 'url', photo2: 'url', photo3: 'url' })
})

export default router
