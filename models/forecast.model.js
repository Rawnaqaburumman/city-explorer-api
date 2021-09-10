"use strict"

class ForeCast {
    constructor(item) {


        this.date = item.valid_date;

        this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;

        this.latatide = `the latitude is ${item.lat}`
        this.longitude = `the longitude is ${item.lon}`
    }
}

module.exports = ForeCast;