const express = require("express");
const mongoose = require('mongoose')
const Event = require('./models/event')
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const app = express()
let PORT = 8080



mongoose.connect(`mongodb+srv://Manikanta:Manikanta@mern-app.kcsrx1t.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
  app.listen(PORT,()=>{console.log(`server is up and running at ${PORT}`)})
})
.catch((error)=>{console.log(error)})



// app.use(bodyParser,urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send("i am here")
})
app.post('/post/v1/events',async (req,res)=>{
  console.log("i came here")
try{
  const data = req.body
  const postedData = await Event.create(data)
  if(postedData){
    return res.json({event: postedData, message:"event succesfully registerd"})
  }
}  catch(err){
    return res.status(404).json(err)
}
})


app.get('/post/v1/events',async (req,res)=>{
  console.log("i came here")
try{
  const postedData = await Event.find()
  if(postedData){
    return res.status(200).json({event: postedData})
  }
}  catch(err){
    return res.status(404).json(err)
}
})



app.get('/post/v1/events/:id',async (req,res)=>{
try{
  console.log("im here getting with id")
  const {id} = req.params
  const postedData = await Event.findOne({_id:id})
  if(postedData){
    return res.status(200).json({event: postedData})
  }
  return res.status(404).json({error:"there is no event with this id"})
}  catch(err){
    return res.status(404).json(err)
}
})




app.put('/post/v1/events/:id',async (req,res)=>{
  try{
    const {id} = req.params
    const data = req.body
    const postedData = await Event.findOneAndUpdate(id,data,{new:true})
    if(postedData){
      return res.status(200).json({event: postedData})
    }else
    return res.status(404).send('There is no event with that id')
  }  catch(err){
      return res.status(404).json(err)
  }
  })


app.delete('/post/v1/events/:id',async (req,res)=>{
  try{
    const {id} = req.params
    const data = await Event.findOne({_id:id})
    const postedData = await Event.deleteOne({_id:id})
    if(data){
      return res.json({event: postedData, message:"succesfully deleted"})
    }else
    return res.status(204)
  }  catch(err){
      return res.json(err)
  }
  })




