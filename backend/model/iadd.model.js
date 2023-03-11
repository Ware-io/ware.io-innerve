const mongoose = require('mongoose')

const Schema = mongoose.Schema

const detectionSchema = new mongoose.Schema({
    time: String,
    imageWidth: Number,
    imageHeight: Number,
    detections: [{
      width: Number,
      height: Number,
      confidence: Number,
      class: String
    }]
  });
  
  const Detection = mongoose.model("Detection", detectionSchema);
  module.exports = Detection