import express from 'express'
const app = express()

import bookingsRoutes from './routes/bookings.js'
app.use(bookingsRoutes)
app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
