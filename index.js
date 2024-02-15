import express from 'express'
const app = express()

import reviewsRouter from './routes/reviews'
get.use(reviewsRouter)
app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})

app.get('/reviews', (req, res) => {
    const reviews = [
        { review_id: 1, user_id: 2, house_id: 34, rating: 4.5, comment: 'it was a great prooperty', date: '2023-01-21'},
        { review_id: 2, user_id: 4, house_id: 34, rating: 4.0, comment: 'Awesome location', date: '2024-02-02'},
        
    ]
    res.send(reviews)
})

