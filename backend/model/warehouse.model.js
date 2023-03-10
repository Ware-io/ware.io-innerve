const mongoose = require('mongoose')

const Schema = mongoose.Schema

const warehouseSchema = new Schema({
    packages_per_warehouse : {
        type : Object,
        required : false
    },
    map_id : {
        type : String,
        required : true
    }

}, {
    timestamps : true
})

const Warehouse = mongoose.model("Warehouse", warehouseSchema)

module.exports = Warehouse