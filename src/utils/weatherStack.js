const request = require('request')


const forecast=(lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d388e3c93f3a7df18e526be84db3aff7&query='+lat+','+long
    console.log(url)
    request({url:url,json:true},(error,response)=>{
     if(error){
         callback('unable to load',undefined)
     }else if(response.body.error){
        callback('unable to load data try another location',undefined)
     }else{
        callback(undefined,response.body.current.temperature)
     }

    })

}

module.exports = forecast

