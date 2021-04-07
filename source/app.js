const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Neha'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About",
        name: "Neha"
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: "Help",
        message: "this is help page",
        name: 'Neha'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return  res.send({
            error: "you must provide an address"
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error)
        {
            return res.send ({ error })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error)
            {
                return res.send(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error: 404',
        name: 'Neha Gayali',
        errorMessage: 'Help atricale not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error: 404',
        name: 'Neha Gayali',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})