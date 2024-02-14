const Reservation = require("../models/Reservation_model")

const create = async (req, res) => {
    try {
        const data = req.body
        
        const reservation = await Reservation.create(data)
        
        res.status(201).json(reservation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { create }