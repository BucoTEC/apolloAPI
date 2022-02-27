const {ApolloServer} = require('apollo-server')
const gql  = require('graphql-tag')
const mongoose = require('mongoose');

const db = process.env.MONGO_URL || 'mongodb://localhost:27017/apollo'
mongoose.connect(db).then(()=>{console.log('connection to db is open');}).catch(err => console.log(err))

const typeDefs = gql`

    type Query{
        sayHi : String!
    }
`

const resolvers = {
    Query:{
        sayHi: ()=> 'Hello from apollo server'
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const port = process.env.PORT || 5000

server.listen(port).then(()=>{console.log(`server is operational on port: ${port}`);}).catch((err)=>{
    console.log(err);
})