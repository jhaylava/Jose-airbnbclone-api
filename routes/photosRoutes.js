import { Router } from 'express'
const router = Router()
// Route to access all photos data
router.get('/photos', (req, res) => {
  // Sample data for photos
  const photos = [
    { photo_id: 1, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 2, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 3, photo1: 'url', photo2: 'url', photo3: 'url' },
    { photo_id: 4, photo1: 'url', photo2: 'url', photo3: 'url' }
  ]
  // Send the photos data as JSON response
  res.json(photos)
})
// Route to access data of a specific photo (photo_id = 1)
router.get('/photos/1', (req, res) => {
  // Sample data for a specific photo
  const photo = { photo_id: 1, photo1: 'url', photo2: 'url', photo3: 'url' }
  // Send the specific photo data as JSON response
  res.json(photo)
})
export default router
