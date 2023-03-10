const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donationSchema = new Schema({
    package_name : {
        type : String,
        required : false
    },
    quantity : {
        type : Number,
        required : true
    }

}, {
    timestamps : true
})

const Donation = mongoose.model("Donation", donationSchema)

module.exports = Donation