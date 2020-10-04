console.log('helo')
let loc
let input= document.getElementById('loc')
let btn= document.getElementById('btn')
console.log(input)
input.addEventListener('change',(e)=>{
      loc=e.target.value
      console.log(loc)
})
btn.addEventListener('click',(e)=>{
    e.preventDefault()
    fetch(`http://localhost:4000/weather?location=${loc}`
)
.then(response=>{
    response.json().then(data=>{
        if(data.error)
         {
            document.getElementById('h1').innerHTML=data.error
            document.getElementById('h1').style.color="red"
            document.getElementById('p1').style.visibility="hidden"
            document.getElementById('img').style.visibility="hidden"

         }
          else{
              
              console.log(data.result)
              document.getElementById('img').style.visibility="visible"
              document.getElementById('p1').style.visibility="visible"
              document.getElementById('h1').style.color="yellow"
              document.getElementById('p1').style.color="green"
             document.getElementById('p1').innerHTML=data.result.forecast
              document.getElementById('h1').innerHTML=data.result.location
            
              document.getElementById('img').src=data.result.icon
              document.getElementById('img').style.height="100px"
              document.getElementById('img').style.width="200px"
            
          }
    }).catch(err=>console.log(err))
})
})
