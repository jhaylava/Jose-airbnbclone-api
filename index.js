import express from 'express'
const app = express()

import housesRouter from './routes/housesRoutes.js'

app.use(housesRouter)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
