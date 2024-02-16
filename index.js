import express from 'express'
const app = express()
import reviewsRoutes from './routes/reviews.js'

app.use(reviewsRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
