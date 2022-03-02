const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
require('dotenv').config()

const db = process.env.MONGO_URL || 'mongodb://localhost:27017/apollo'
mongoose.connect(db).then(()=>{console.log('connection to db is open');}).catch(err => console.log(err))




const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>({req}),
})

const port = process.env.PORT || 5000

server.listen(port).then(()=>{console.log(`server is operational on port: ${port}`);}).catch((err)=>{
    console.log(err);
})