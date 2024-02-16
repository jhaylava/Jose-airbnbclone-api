import express from 'express'
const app = express()

import housesRouters from './routes/housesRoutes.js'

app.use(housesRouters)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
