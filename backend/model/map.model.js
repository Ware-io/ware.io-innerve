const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mapSchema = new Schema({
    warehouse_id : {
        type : String,
        required : true
    },
    shelf : new Schema({
        shelf_name : {
            type : String,
            required : true
        },
        row : new Schema({
            row_name : {
                type : String,
                required : true
            },
            total : {
                type : Number,
                required : true
            },
            available : {
                type : Number,
                required : true
            }
        })
    }),
    map_total : {
        type : Number,
        required : true
    },
    map_available : {
        type : Number,
        required : true
    }

}, {
    timestamps : true
})

const Map = mongoose.model("Map", mapSchema)

module.exports = Map