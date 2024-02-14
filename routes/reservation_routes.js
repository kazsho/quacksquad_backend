const { Router } = require('express')
const reservationController = require('../controllers/reservation_controller')

const reservationRouter = Router()

reservationRouter.post("/", reservationController.create)

module.exports = reservationRouter