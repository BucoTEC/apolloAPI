const postsResolvers = require('./posts')
const userResolvers = require('./users')
const commentsResolvers = require('./comments');
module.exports ={
    Query:{
        ...postsResolvers.Query,
        ...userResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation

    }
}