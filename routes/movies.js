const express = require('express')

const { getFavorites, getMovies, postAddToFavorites } = require('../controllers/movies')

const router = express.Router()

router.get('/', getMovies)
router.get('/favorites', getFavorites)

router.post('/add-to-favorites', postAddToFavorites)

module.exports = router