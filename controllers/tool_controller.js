const Tool = require("../models/Tool_model")

const index = async (req, res) => {
    try{
        const data = await Tool.getAll()
        res.status(200).json(data)
    }catch (error){
        res.status(500).json({error: error.message})
    }
} 

const random = async (req, res) => {
    try{
        const data = await Tool.showRandom()
        res.status(200).json(data)
    }catch (error){
        res.status(500).json({error: error.message})
    }
} 

const search = async (req, res) => {
    try {
      const query = await Tool.searchByQuery(req.query.search)
      res.status(200).json(query);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tool = await Tool.getOneById(id);
        res.status(200).json(tool);
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

const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const updatedTool = await Tool.update(id, data)
        res.status(200).json(updatedTool)
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
}

const destroy = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const result = await Tool.destroy(id)
        res.status(204).end()

    }catch (error){
        res.status(404).json({error: error.message})
    }
}


module.exports = { index, show, create, update, destroy, search, random }