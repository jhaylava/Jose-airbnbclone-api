import express from 'express'
import bookingsRoutes from './routes/bookings.js'

const app = express()

app.use(bookingsRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
