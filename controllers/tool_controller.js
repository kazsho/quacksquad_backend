const Tool = require("../models/Tool_model")

const index = async (req, res) => {
    try{
        const data = await Tool.getAll()
        res.status(200).json(data)
    }catch (error){
        res.status(500).json({error: error.message})
    }
} 


module.exports = { index }