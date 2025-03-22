const express = require('express')

const sequelize = require('./util/database')
const setupAssociations = require('./util/associations')
const authRoutes = require('./routes/auth')

const app = express()

app.use(express.json())

app.use(authRoutes)

// handle 404s
app.use((req, res, next) => {
    res.status(404).send()
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