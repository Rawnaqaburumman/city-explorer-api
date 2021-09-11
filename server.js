"use strict"

require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT
const cors = require('cors');
const axios = require('axios');
server.use(cors());


const gettingWheather = require('./controller/forecast.controller')
const gettingMovies = require('./controller/movies.controller')




server.get('/', (req, res) => {
    res.send('home route')
})

server.get('/dataTest', (req, res) => {
    res.send(weatherData)
})



server.get('/weather', gettingWheather);
server.get('/movie', gettingMovies);

server.get('*', (req, res) => {
    res.status(404).send('Something went wrong');
});



server.listen(PORT)

