const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const indexRouter = require('./routes')
const adminRouter = require('./routes/admin')

const app = express() // Creates the web application server


// Tell app where views are
app.set('views', path.join(__dirname, 'views')) // Views are html files or things that will become html files
app.set('view engine', 'hbs') // use handlebars as view engine

//enable parsing
app.use(bodyParser.urlencoded({ extended: false }))

const staticFileLocation = path.join(__dirname, 'public')
app.use(express.static(staticFileLocation))

app.use('/', indexRouter) // All requests to the app will be passed to indexRouter
app.use('/admin', adminRouter)

// Error handler - must come after all the routers
app.use(function (error, req, res, next) {
    console.error(error)
    res.status(500)
    res.render('errors', { message: res.locals.message })
})

// Start server running
const port = process.env.PORT || 3000
const server = app.listen(port, function (error) {
    // Express 5 calls this on failure too, with the error
    if (error) {
        console.error('Server could not start:', error.message)
        process.exit(1)
    }
    console.log('Server running on port ' + server.address().port)
})