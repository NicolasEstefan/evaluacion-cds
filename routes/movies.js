const express = require('express')
const axios = require('axios')

const applySuggestionScore = require('../util/suggestion_score')

const router = express.Router()

router.get('/', async (req, res, next) => {
    let { keyword } = req.query

    let params = {}
    let endpoint = process.env['API_DISCOVER_ENDPOINT']
    if (keyword) {
        params.query = keyword
        endpoint = process.env['API_SEARCH_ENDPOINT']
    }

    try {

        const apiResponse = await axios.get(endpoint, {
            params,
            headers: {
                'Authorization': `Bearer ${process.env['API_KEY']}`
            }
        })

        const movies = await applySuggestionScore(apiResponse.data.results)
        res.status(200).json({ movies })

    } catch (err) {
        console.log(err)
        next(err)
    }

})

module.exports = router