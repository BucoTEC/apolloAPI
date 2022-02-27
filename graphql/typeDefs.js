const gql  = require('graphql-tag')

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!,
        username: String!
    }
    type Query{
        allPosts : [Post]
    }
`

module.exports = typeDefs
