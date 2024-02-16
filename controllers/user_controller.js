const bcrypt = require('bcrypt')
const User = require('../models/User_model')
const Token = require('../models/Token_model')

const register = async (req, res) => {

    try{
        const data = req.body
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
        data["staff_password"] = await bcrypt.hash(data.staff_password, salt)
        const result = await User.create(data)
        res.status(201).send(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }

};

const login = async (req, res) => {
    const data = req.body
    try{

        const user = await User.getOneByUsername(data.staff_username)
        const authenticated = await bcrypt.compare(data.staff_password, user.staff_password)
        if (!authenticated){
            throw new Error("Incorrect details")
        }else{
            const token = await Token.create(user["staff_id"])
            res.status(200).json({authenticated: true, token: token.token})
        }

    }catch (err){
        res.status(401).json({error: err.message})
    }
}

module.exports = {
    register, login
}                           