let Packages = require("../model/packages.model")
const router = require("express").Router()
let Warehouse = require("../model/warehouse.model")
let Donation = require("../model/donation.model")
const insertMap = require('../routes/createMap')
const Detection = require("../model/iadd.model")
router.route("/").get((req, res) => {
    Packages.find()
        .then(package => res.json(package))
        // .then(exercises => res.send(JSON.stringify(exercises)))
        .catch(err => res.status(400).json("Error : " + err))
})

router.route("/add").post(
    (req, res) => {
        const package_name = req.body.package_name
        const quantity = Number(req.body.quantity)
        const date_of_entry = Date.parse(req.body.date_of_entry)
        const date_of_exit = Date.parse(req.body.date_of_exit)
        const date_of_expiry = Date.parse(req.body.date_of_expiry)
        const selling_price = Number(req.body.selling_price)
        const cost_price = Number(req.body.cost_price)
        const date_of_notification = Date.parse(req.body.date_of_notification)
        const owner_name = req.body.owner_name
        const size = req.body.size

        const newPackage = new Packages({
            package_name,
            quantity,
            date_of_entry,
            date_of_exit,
            date_of_expiry,
            selling_price,
            cost_price,
            date_of_notification,
            owner_name,
            size
        })


        // newPackage.save()
        //     .then(() => {
        //         const newWareshouse = new Warehouse({
        //             packages_per_warehouse: newPackage._id
        //         })
        //         newWareshouse.save()

        //         res.json("Package Added!!!")

        //     })
        //     .catch(err => res.status(400).json("Error : " + err))


        newPackage.save()

            .then(data => {
                // console.log(data)
                Warehouse.find()
                    .then((temp) => {
                        console.log(temp)
                        if (temp) {
                            Warehouse.findByIdAndUpdate(temp[0]._id, {$inc: {"available" : -newPackage.quantity}}).then((result)=>{
                                    // result.available = result.available - data.quantity
                                    // console.log(warehouse.ress_per_warehouse)
                                    // result.packages_per_warehouse.push(data._id.toString());
                                    // result.save()
                                    res.json('package updated!');
                            }).catch((err)=>{
                                res.status(400).json('Error: ' + err);
                            })
                        }
                    })


                    // .then(warehouse => {
                    //     // console.log(warehouse[0]._id)
                    //     if (warehouse[0]) {
                    //         // Update the warehouse record with the new package details
                    //         Warehouse.findById(warehouse[0]._id)
                    //             .then((model) => {
                    //                 warehouse[0].available = warehouse[0].available - data.quantity
                    //                 // console.log(warehouse.packages_per_warehouse)
                    //                 warehouse[0].packages_per_warehouse.push(data._id.toString());
                    //             }).then(() => {
                    //                 res.json("Records updated")
                    //             })
                                
                            
                            
                            
                    //         // warehouse.save();
                    //         // res.json("package updated!!!")
                    //     } 
                        // else {
                        //     const newWareshouse = new Warehouse({
                        //         packages_per_warehouse: [data._id.toString()],
                        //         total : 100,
                        //         available : 100
                        //     })
                        //     newWareshouse.save()
                        //     res.json("Package Added!!!")
                        // }
                        // res.json("Package Added!!!");
                    // })
            })
            .catch(err => res.status(400).json("Error : " + err))

    }

)

router.route('/:id').get((req, res) => {
    Packages.findById(req.params.id)
        .then(package => res.json(package))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Packages.findByIdAndDelete(req.params.id)
        .then(() => res.json('Packages deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/donate/:id').delete((req, res) => {
    Packages.findByIdAndDelete(req.params.id)
        .then((data) => {
            const newDonation = new Donation({
                package_name: data.package_name,
                quantity: data.quantity
            })

            newDonation.save()

            res.json('Packages donated.')
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Packages.findById(req.params.id)
        .then(package => {
            package.package_name = req.body.package_name;
            package.quantity = Number(req.body.selling_price)
            package.date_of_entry = Date.parse(req.body.date_of_entry)
            package.date_of_exit = Date.parse(req.body.date_of_exit)
            package.date_of_expiry = Date.parse(req.body.date_of_expiry)
            package.selling_price = Number(req.body.selling_price)
            package.cost_price = Number(req.body.cost_price)
            package.date_of_notification = Date.parse(req.body.date_of_notification)
            package.map_location = req.body.map_location
            package.owner_name = req.body.owner_name
            package.size = req.body.size

            package.save()
                .then(() => res.json('Package updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/detections").post((req, res) => {
    const { time, imageWidth, imageHeight, detections } = req.body;
  
    try {
      const newDetection = new Detection({
        time,
        imageWidth,
        imageHeight,
        detections
      });
      newDetection.save();
      res.status(201).json({ message: "Detection saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error saving detection" });
    }
  });

module.exports = router