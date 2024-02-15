import { Router } from 'express'
cons router = Router()
//Seting the route to 
router.get('/photos', (req, res) => {
    res.send([{ photo_id: 1, photo1: 'url', photo2: 'url', photo3: 'url' },
        { photo_id: 2, photo1: 'url', photo2: 'url', photo3: 'url' },
        { photo_id: 3, photo1: 'url', photo2: 'url', photo3: 'url' },
        { photo_id: 4, photo1: 'url', photo2: 'url', photo3: 'url' }])
})

router.get('/photos/1', (req, res) => {
    res.send({{photo_id: 1,photo1: 'url',photo2:'url',photo3:'url'}})
})

export default router