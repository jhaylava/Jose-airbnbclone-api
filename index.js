import express from 'express'
const app = express()

import bookingsRoutes from './routes/bookings.js'
import reviewsRoutes from './routes/reviews.js'
import photosRoutes from './routes/photosRoutes.js'
import housesRouters from './routes/housesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import usersRoutes from './routes/userRoutes.js'

app.use(authRoutes)
app.use(usersRoutes)
app.use(photosRoutes)
app.use(housesRouters)
app.use(bookingsRoutes)
app.use(reviewsRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})