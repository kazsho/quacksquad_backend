const Reservation = require("../models/Reservation_model")

const create = async (req, res) => {
    try {
        const tool_id = req.params.tool_id
        const { email_address, name, phone_number, start_date, end_date } = req.body
        
        const reservation = await Reservation.create({ tool_id, email_address, name, phone_number, start_date, end_date })
        
        res.status(201).json(reservation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { create }