const Tool = require("../models/Tool_model")

const index = async (req, res) => {
    try{
        const data = await Tool.getAll()
        res.status(200).json(data)
    }catch (error){
        res.status(500).json({error: error.message})
    }
} 

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const tool = await Tool.getOneById(id);
        res.json(tool);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};


module.exports = { index, show }