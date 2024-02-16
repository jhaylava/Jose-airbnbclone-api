import express from 'express'
const app = express()

import usersRoutes from './routes/userRoutes.js'
import photosRoutes from './routes/photosRoutes.js'
import housesRouters from './routes/housesRoutes.js'

app.use(usersRoutes)
app.use(photosRoutes)
app.use(housesRouters)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})