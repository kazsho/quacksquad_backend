const Tool = require("../models/Tool_model")

const index = async (req, res) => {
    try{
        const data = await Tool.getAll()
        res.status(200).json(data)
    }catch (error){
        res.status(500).json({error: error.message})
    }
} 

const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tool = await Tool.getOneById(id);
        res.json(tool);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

const create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Tool.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
}




module.exports = { index, show, create }