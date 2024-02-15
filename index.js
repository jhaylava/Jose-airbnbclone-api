import express from 'express'

const app = express()
import userRoutes from './routes/userRoutes.js'

// Tell the app to use the user router
app.use(userRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
