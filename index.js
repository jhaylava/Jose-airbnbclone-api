import express from 'express'
const app = express()

import bookingsRouter from './routes/bookings.js'
app.use(bookingsRouter)
app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
