module.exports = (movies) => {
    movies.forEach(movie => {
        movie.suggestionScore = Math.random() * 99
    })

    movies.sort((a, b) => {
        if (a.suggestionScore < b.suggestionScore)
            return 1
        else
            return -1
    })

    return movies
}