const express= require('express')
const path= require('path')
const app= express()
const hbs= require('hbs')
const getWeather= require('../weather-app/getWeather')
//for .hbs pages...
app.set('view engine','hbs') // setting view engine of express to hbs.(handlebars-dynamic html pages)
// by default nodejs searches for .hbs files in folder named as "views"  but if we want to give different name to folder containng .hbs files then refer below..
const viewspath= path.join(__dirname,'./templates/views')
app.set('views',viewspath)

//setting partials- partials are part of html pages and can be inculded in html pages to apply common content to multiple pages...
const partialspath= path.join(__dirname,'./templates/partials') // any file inside this directory path will be partial file for express
hbs.registerPartials(partialspath)

//for static html pages ...
console.log(path.join(__dirname,'./public'))
const htmlpath= (path.join(__dirname,'./public'))
app.use(express.static(htmlpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Page',
        author:'Sourav'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        author:'Sourav'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:'We are here to help you...',
        author:'Sourav'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.json({
            error:'Location required for forcast...'
        })
    }
   getWeather(req.query.location,(err,result)=>{
       if(err)
       return res.json({error:err})
       else
        {
           
           return  res.json({
               result:result
            })
        }
   }) 
    
})
app.get('/help/*',(req,res)=>{
   res.render('error',{
    title:'Help Page',
    message:'Help article not found.',
    author:'Sourav'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{ title:'404',
    message:' page not found',
    author:'Sourav'})
})






let port = process.env.PORT||4000

app.listen(port,()=>console.log(`port ${port} up and running...`))