"use strict"
const axios = require('axios');
require('dotenv').config();
const Movie = require('../models/movies.model');
const Cache = require('../helper/cache.helper');
let cacheObj = new Cache();






console.log('================');
console.log('Cache instance created');
console.log('================');




const gettingMovies = async (req, res) => {
  
    const moviesKey = process.env.MOVIE_API_KEY;
    let movieCityName = req.query.city_name;

    const movieBackUrl = 'https://api.themoviedb.org/3/search/movie?'
    const InMilSec = 4000;
    const passed = (Date.now() - cacheObj.timeStamp) > InMilSec;
    if (passed) {
      console.log('================');
      console.log('Cache Reset');
      console.log('================');
      cacheObj = new Cache();
    }

    const checkData= cacheObj.movies.find(location => location.movieCityName );
   
    if (checkData) {
      res.send(checkData);
    } else {
      console.log('No Cache data found');
      console.log('================');

    try {

        const movieResult = await axios.get(`${movieBackUrl}?&api_key=${moviesKey}&query=${movieCityName}`)
        console.log(movieResult);


        if (movieCityName ) {
           


        let moviesArray = movieResult.data.results.map(item => {
            return new Movie(item);
        })


        console.log('================');
        console.log('Save data into cache');
        console.log('================');
  
        cacheObj.movies.push({
          "cityName":movieCityName ,
          "moviesArray": moviesArray
        });
        console.log('================');
        console.log(cacheObj);
        console.log('================');
        res.send(moviesArray);
      } else {
        res.send('no data found :disappointed:')
      }





    console.log(moviesArray)


  
    }
    catch {
        res.status(500).send('we dont have this city');
    };
    }
}
module.exports = gettingMovies;