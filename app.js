require('dotenv').config()
const express=require("express")
const path=require('path')
const https=require("https")
const bodyParser=require('body-parser')
const app=express()
const port=5000;
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
 
   res.sendFile(path.join(__dirname+'/index.html'))
})

app.post("/",function(req,res){
    console.log(req.body.city);
    const city=req.body.city;
    const appid=process.env.API_KEY
    const unit="metric";
      const url="https://api.openweathermap.org/data/2.5/weather?units="+unit+"&q="+city+"&appid="+appid;
      https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
          const wetherData=JSON.parse(data);
          const temp=wetherData.main.temp;
          const description=wetherData.weather[0].description;
          const city=wetherData.name;
          const icon=wetherData.weather[0].icon
          const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
          console.log(wetherData);
          console.log(temp);
          console.log(description);
          console.log(city);
          res.write("<p>the wether description "+description+"</p>")
          res.write("<H1>The temprature in "+city+" is "+temp+" degrees.</H1>");
          res.write("<img src="+imageURL+">")
          res.send();
    
        })
      })
    
    })



app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
})


