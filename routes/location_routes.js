const { Router } = require('express')
const locationController = require('../controllers/location_controller')

const locationRouter = Router()

locationRouter.get("/", locationController.index)
locationRouter.get("/:id", locationController.show)

module.exports = locationRouter