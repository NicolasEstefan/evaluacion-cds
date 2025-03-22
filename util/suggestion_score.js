module.exports = (movies, propertyName) => {
    movies.forEach(movie => {
        movie[propertyName] = Math.random() * 99
    })

    movies.sort((a, b) => {
        if (a[propertyName] < b[propertyName])
            return 1
        else
            return -1
    })

    return movies
}