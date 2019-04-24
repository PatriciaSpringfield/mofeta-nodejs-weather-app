const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

/**
 * How to create a web-server using express tool or library
 * app.com
 * app.com/help
 * app.com/about
 */


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Heroku port
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup a value - setting - handlebars engine setup
app.set('view engine', 'hbs')
// setup a value - setting - customized views location 'templates'
app.set('views', viewsPath)

// Setup handlebars partials
hbs.registerPartials(partialsPath)

// Is a way to customize your web server to serve resources 
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// routes - handlebars setup
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Patricia Springfield'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Patricia Springfield.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is my message :)',
        title: 'Help',
        name: 'Patricia Springfield'
    })
})

// Tell express what we want to do
// get method - to get resources
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Mofeta'
//     }, {
//         name: 'Springfield'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must to provide address'
        })
    }

    const address = req.query.address
    console.log(address)
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send('You must to provide a search term')
    }
    console.log(req.query)
    res.send({
        products: []
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Patricia Springfield'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Patricia Springfield'
    })
})

// How to start the web server using listener and callback function/process
// Web server process will be up and running to listening new incoming requests
app.listen(port, () => {
    console.log(`Server is up in port ${port}`)
})


