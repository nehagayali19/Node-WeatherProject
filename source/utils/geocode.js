const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoibmVoYWdheWFsaSIsImEiOiJja21mOXJnMjMzMnZoMnBvajBydXV1N2NlIn0.vqRcGbB9p4hQkJiDw1UI4A&limit=1'

    request({url, json:true}, (error, {body} = {}) => {
        if(error)
        {
            callback('Uanble to connect to location services', undefined)
        }
        else if(body.features.length === 0) {
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
       