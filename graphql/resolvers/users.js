const User = require('../../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators')
const {UserInputError} = require('apollo-server')
const tajna = process.env.SECRET || 'ovojemojatajnahahah'
function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      tajna,
      { expiresIn: '1h' }
    );
  }

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
        },
        async login(_,{username, password}){
            const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong crendetials';
        throw new UserInputError('Wrong crendetials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
        }
    }
}