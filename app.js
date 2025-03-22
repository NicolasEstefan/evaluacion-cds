const express = require('express')

const sequelize = require('./util/database')
const setupAssociations = require('./util/associations')

const isAuth = require('./middleware/auth')

const authRoutes = require('./routes/auth')
const moviesRoutes = require('./routes/movies')

const app = express()

app.use(express.json())

// Define routes
app.use(authRoutes)
app.use('/movies', isAuth, moviesRoutes)

// Handle 404s
app.use((req, res, next) => {
    res.status(404).send()
})

// Handle errors
app.use((err, req, res, next) => {
    res.status(500).json({ errorMessage: "An unexpected error occured while processing your request, if the error persists, please contact us." })
})

setupAssociations()

sequelize.sync(/*{ force: true }*/)
    .then(() => {
        app.listen(process.env['PORT'], err => {
            if (err)
                console.log(err)
            else
                console.log(`Server started on port ${process.env['PORT']}`)
        })
    })
    .catch(err => {
        console.log(err)
    })