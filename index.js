import express from 'express'

const app = express()
import photosRoutes from './routes/photosRoutes.js'

app.use(photosRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
