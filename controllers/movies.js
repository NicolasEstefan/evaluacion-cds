const axios = require('axios')

const applySuggestionScore = require('../util/suggestion_score')
const Movie = require('../models/Movie')

exports.getMovies = async (req, res, next) => {
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

        const movies = applySuggestionScore(apiResponse.data.results, 'suggestionScore')
        res.status(200).json({ movies })

    } catch (err) {
        console.log(err)
        next(err)
    }

}

exports.postAddToFavorites = async (req, res, next) => {
    const { movieId } = req.body

    if (!movieId) {
        res.status(400).json({ errorMessage: 'Must specify the id of the movie to add to favorites with "movieId".' })
        return
    }

    try {

        const favorites = await req.user.getMovies({ where: { id: movieId } })

        if (favorites.length > 0) {
            res.status(200).json({ message: "Movie already in favorites." })
            return
        }

        let movie = await Movie.findByPk(movieId)

        if (!movie) {
            const apiResponse = await axios.get(`${process.env['API_MOVIE_ENDPOINT']}/${movieId}`, {
                headers: {
                    'Authorization': `Bearer ${process.env['API_KEY']}`
                }
            })

            movie = await Movie.create({
                id: movieId,
                data: apiResponse.data
            })
        }

        await req.user.addMovie(movie)

        res.status(200).json({ message: "Movie added to favorites successfully." })

    } catch (err) {
        if (err.response && err.response.status === 404) {
            res.status(404).json({ errorMessage: "The specified movie does not exist." })
            return
        }

        console.log(err)
        next(err)
    }

}

exports.getFavorites = async (req, res, next) => {
    try {

        const fetchedMovies = await req.user.getMovies()

        let resMovies = fetchedMovies.map(movie => {
            const resMovie = movie.data
            resMovie.addedAt = movie.favorite.createdAt
            return resMovie
        })

        resMovies = applySuggestionScore(resMovies, 'suggestionForTodayScore')

        res.status(200).json(resMovies)

    } catch (err) {
        console.log(err)
        next(err)
    }


}