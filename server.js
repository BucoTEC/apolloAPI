const {ApolloServer} = require('apollo-server')
const gql  = require('graphql')

const typeDefs = gql`

    type Query: {
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