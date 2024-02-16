import express from 'express'
const app = express()
import photosRoutes from './routes/photosRoutes.js'

app.use(photosRoutes)

import housesRouters from './routes/housesRoutes.js'

app.use(housesRouters)

import bookingsRoutes from './routes/bookings.js'
import reviewsRoutes from './routes/reviews.js'

app.use(bookingsRoutes)
app.use(reviewsRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
