const gql  = require('graphql-tag')

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!,
        username: String!
        commenst: [Comment!]!
        likes: [Like]!
    }
    type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
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
        getPost(postId: ID!):Post
    }
    input registerInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!

    }
    type Mutation{
        register(registerInput: registerInput): User!
        login(username: String!, password: String!): User!
        createPost(body:String!):Post!
        deletePost(postId:ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        zlikePost(postId: ID!): Post!
    }
`

module.exports = typeDefs
