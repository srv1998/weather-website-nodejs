

const request= require('request')

const  getWeather=(loc,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=34b6037e54a87e228f9b90d08f0b2b60&query=${encodeURIComponent(loc)}&units=m`
    //fetch not defined error ...not occured in react js..
    // fetch(url,{
    //     method:GET,
    //     headers:{
    //         Accept:'application/json',
    //         'content-type':'application/json'
    //     }
    // }).then(res=>console.log(res)).catch(err=>console.log(err))
    request({url,json:true},(err,res)=>{
        if(res){
            
           
            if(res.body.error){
                //console.log(chalk.red(res.body.error.info))
                callback('Please enter a valid location.',undefined)  
            }
            else
           { //console.log(chalk.green())
             callback(undefined,{
                 icon:res.body.current.weather_icons[0],
                 location:res.body.location.name+", "+res.body.location.country,
                 forecast:res.body.current.temperature +" degrees with "+res.body.current.weather_descriptions[0]
             })
        }    
 }
        else
        callback('cant connect to the API',undefined)
    })
}

module.exports=getWeather