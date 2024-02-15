app.get('/reviews', (req, res) => {
    const reviews = [
        { id: 1, name: 'Product A', price: 100 },
        { id: 2, name: 'Product B', price: 150 },
        
    ]
    res.send(reviews)
})