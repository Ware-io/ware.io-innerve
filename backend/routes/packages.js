let Packages = require("../model/packages.model")
const router = require("express").Router()
let Warehouse = require("../model/warehouse.model")

router.route("/").get((req, res) => {
    Packages.find()
        .then(package => res.json(package))
        // .then(exercises => res.send(JSON.stringify(exercises)))
        .catch(err => res.status(400).json("Error : " + err))
})

router.route("/add").post(
    (req, res) => {
        const package_name = req.body.package_name
        const quantity = Number(req.body.selling_price)
        const date_of_entry = Date.parse(req.body.date_of_entry)
        const date_of_exit = Date.parse(req.body.date_of_exit)
        const date_of_expiry = Date.parse(req.body.date_of_expiry)
        const selling_price = Number(req.body.cost_price)
        const cost_price = Number(req.body.cost_price)
        const date_of_notification = Date.parse(req.body.date_of_notification)
        const map_location = req.body.map_location
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
            map_location,
            owner_name,
            size
        })

        

        newPackage.save()
            .then(() => {
                const newWareshouse = new Warehouse({
                    packages_per_warehouse : newPackage._id
                })
                newWareshouse.save()

                res.json("Package Added!!!")

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

module.exports = router