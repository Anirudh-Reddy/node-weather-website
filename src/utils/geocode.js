const request = require('request')

const geocode=(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW5pcnVkaC0xNCIsImEiOiJja2ppOTB6OGI0ZGZrMnpucWE3djB2eWRnIn0.6VIyZPoX1V6eqW4wH7ZAwQ&limit=1'

request({url:url,json:true},(error,response)=>{
if(error){
    callback('error:404',undefined)
}else if(!response.body.features[0]){
    callback('wrong location',undefined)
}else{
    callback(undefined,{latitude :response.body.features[0].center[1],
        longitude:response.body.features[0].center[0],
    location:response.body.features[0].place_name})
    }
})
      
}
module.exports = geocode
