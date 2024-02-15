import express from 'express'

const app = express()
import authRoutes from './routes/authRoutes.js'
app.use(authRoutes)
app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
