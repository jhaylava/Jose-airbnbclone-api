import { Router } from 'express'
import db from '../db.js'
import jwt from 'jsonwebtoken'
import { secret } from '../secrets.js'
const router = Router()

// Post to photos data
router.post('/photos', async (req, res) => {
  try {
    const { url, house_id } = req.body
    const token = req.cookies.jwt
    if (!token) {
      throw new Error('Missing the token')
    }

    const decoded = jwt.verify(token, secret)
    const userFoundQuery = `
      SELECT * FROM houses WHERE host_id = '${decoded.user_id}'
    `
    const userFound = await db.query(userFoundQuery)
    if (!userFound.rows.length > 0) {
      throw new Error('Invalid authentication token or host not found')
    }

    const insertPhotoQuery = `
      INSERT INTO photos (url, house_id)
      VALUES ('${url}', '${house_id}')
      RETURNING *
    `

    const { rows } = await db.query(insertPhotoQuery)
    res.status(201).json(rows[0]) // 201 Created
  } catch (err) {
    res.status(400).json({ error: err.message }) // 400 Bad Request
  }
})

// Route to access all photos data
router.get('/photos', async (req, res) => {
  try {
    const { house } = req.query
    const houseSearch = `
      SELECT * FROM photos
    `
    const { rows } = await db.query(houseSearch)
    console.log(houseSearch)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json({ error: 'we are down' })
  }
})

// Route to access data of a specific photo (photo_id = 1)
router.get('/photos/:photo_id', async (req, res) => {
  // Sample data for a specific house
  const numbId = Number(req.params.photo_id)
  try {
    if (!numbId) {
      throw new Error(`photo id most be a number`)
    }
    const result = await db.query(
      `SELECT * FROM photos WHERE photos.photo_id = ${numbId}`
    )
    // Send the specific photo data as JSON response
    let resultArr = result.rows
    if (!resultArr.length) {
      throw new Error(`Sorry, photo not found`)
    }
    res.json(resultArr[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

// PATCH: Route for clients to update existing data
router.patch('/photos/:photo_id', async (req, res) => {
  try {
    const { rows } = await db.query(`
    UPDATE photos
    SET url = '${req.body.url}'
    WHERE photo_id = ${req.params.photo_id}
    RETURNING *
  `)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.error })
  }
})

// Delete Route for clients to delete existing data
router.delete('/photos/:photo_id', async (req, res) => {
  try {
    const { rowCount } = await db.query(`
    DELETE FROM photos WHERE photo_id = ${req.params.photo_id}
    `)
    if (!rowCount) {
      throw new Error('Delete Failed')
    }
    res.json(rowCount)
  } catch (err) {
    res.json({ error: err.message })
  }
})
export default router
