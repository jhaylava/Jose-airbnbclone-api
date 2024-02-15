import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
