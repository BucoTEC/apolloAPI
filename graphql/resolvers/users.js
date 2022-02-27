const User = require('../../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validateRegisterInput} = require('../../utils/validators')
const {UserInputError} = require('apollo-server')
const tajna = process.env.SECRET || 'ovojemojatajnahahah'


module.exports ={
    Mutation:{
        async register(_, {
            registerInput: 
            { 
            username, password, email, confirmPassword}},
             ){
                const {valid, errors} = validateRegisterInput(username,email, password, confirmPassword)
                if(!valid){
                    throw new UserInputError('Input error', {errors})
                }
                
                const user = await User.findOne({username})
                if(user){
                    throw new UserInputError('User already exists')
                }
                const hashedPassword = await bcrypt.hash(password, 12)
                const newUser = new User({
                    username,
                    email,
                    createdAt: new Date().toISOString(),
                    password: hashedPassword
                })
                const res =  await newUser.save()

                const token = jwt.sign({
                    username: res.username,
                    id: res.id,
                    email: res.email
                },tajna, {
                    expiresIn: '1h'
                })

                return {
                    ...res._doc,
                    id: res._id,
                    token
                }
        }
    }
}