const request = require('request')
// const url = 'https://api.darksky.net/forecast/5cc5ebfe29edbe6f120cdea9897fcf78/37.8267,-122.4233'

// request({ url: url, json: true }, (error, response) => {
//     if(error) {
//         console.log('unable to connect to Weather service!!!')
//     } else if(response.body.error) {
//         console.log('unable to find location')
//     } else {
//         console.log(response.body.daily.data[0].summary + ` It's currently ` + response.body.currently.temperature + ' degrees out. ' + 'There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//     }
// })

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

const forecast = (latitude, longitute, callback) => {
    const url = 'https://api.darksky.net/forecast/5cc5ebfe29edbe6f120cdea9897fcf78/' + latitude + ',' + longitute
    request({ url, json: true }, (error, response) => {

        const { body } = response

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ` It's currently ` + body.currently.temperature + ' degrees out. ' + 'There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast