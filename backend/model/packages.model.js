const mongoose = require('mongoose')

const Schema = mongoose.Schema

const packagesSchema = new Schema({
    package_name : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
    },
    date_of_entry : {
        type : Date,
        required : true
    },
    date_of_exit : {
        type : Date,
        required : true
    },
    date_of_expiry : {
        type : Date,
        required : false
    },
    selling_price : {
        type : Number,
        required : false
    },
    cost_price : {
        type : Number,
        required : false
    },
    date_of_notification : {
        type : Date,
        required : false
    },
    map_location : {
        type : String,
        required : true
    },
    owner_name : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    }
    
}, {
    timestamps : true
})

const Packages = mongoose.model("Packages", packagesSchema)

module.exports = Packages