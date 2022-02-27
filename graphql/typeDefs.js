const gql  = require('graphql-tag')

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!,
        username: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Query{
        allPosts : [Post]
    }
    input registerInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!

    }
    type Mutation{
        register(registerInput: registerInput): User!
    }
`

module.exports = typeDefs
