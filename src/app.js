const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require("request")
const forecast = require('./utils/weatherStack')
const geocode = require('./utils/geocode.js')
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{title:'Weather App',footer:'Weather App footer'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'Course Name',name:'Node.js Tutorial',footer:'Weather App footer'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'Help page',footer:'Weather App footer'})
})
app.get('/weather',(req,res)=>{ 
    if(!req.query.address){
        return res.send({
            error:"no address found"
        })
    }
 console.log(req.query.address)
            geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
                if(error){
                    return res.send({
                        error:"no address found"
                    }) 
                }

            forecast(latitude, longitude, (error, data) => {
                if(error){
                    return res.send({
                        error:"no address found"
                    }) 
                }

    res.send({
        response:data,
        location,
        address : req.query.address,
    })
  })
 })
})  
app.get('*',(req,res)=>{
    res.send('404, Page Not Found')
})
app.listen(3000,()=>{
    console.log('server running at port 3000')
})


