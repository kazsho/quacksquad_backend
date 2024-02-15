const Location = require("../models/Location_model")

const index = async (req, res) => {
    try{
        const data = await Location.getAll()
        res.status(200).json(data)
    }catch (error){
        res.status(500).json({error: error.message})
    }
} 
  
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const location = await Location.getOneById(id);
        res.status(200).json(location);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = { index, show }