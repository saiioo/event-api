const mongoose = require('mongoose')

const eventModel = new mongoose.Schema({
  title:{
    type : String,
    required : true
  },
  description:{
    type : String,
    required : true
  },
  startTime:{
    type : String,
    required : true
  },  
    endTime:{
    type : String,
    required : true
  }
},{timestamps:true})

const userModel = mongoose.model('Evnet', eventModel )

module.exports = userModel