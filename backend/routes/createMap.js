const express = require('express')
const router = express.Router()

module.exports = function (db, id) {
    router.post('/createMap', async (req, res) => {
        const data = req.body
        const noOfShelves = data.noOfShelves, noOfRows = data.noOfRows, noOfCols = data.noOfCols
        let shelf = {
            "warehouse_id": id,
            "shelf": {},
            "mapTotal": noOfShelves * noOfRows * noOfCols,
            "mapAvailable": noOfShelves * noOfRows * noOfCols
        }
        for (let i = 1; i <= noOfShelves; i++) {
            shelf["shelf"][`S${i}`] = {}
            shelf["shelf"][`S${i}`]["row"] = {}
            for (let j = 1; j <= noOfRows; j++) {
                let rowName = `R${j}`
                shelf["shelf"][`S${i}`]["row"][rowName] = {
                    "total": (noOfRows * noOfCols),
                    "available": (noOfRows * noOfCols)
                }
            }
        }

        try {
            const collection = db.collection('map')
            await collection.insertOne(shelf)
            console.log('Map created successfully.')
            res.status(200).send('Map created successfully.')
        } catch (error) {
            console.error(`Error creating map: ${error}`)
            res.status(409).send(`Error creating map: ${error}`)
        }
    })
    return router
}