const mongoose = require('mongoose')

const Schema = mongoose.Schema

const warehouseSchema = new Schema({
    packages_per_warehouse: [{
        type: String
    }],
    total: {
        type: Number,
        required: true
    },
    available: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Warehouse = mongoose.model("Warehouse", warehouseSchema)

module.exports = Warehouse