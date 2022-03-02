const postsResolvers = require('./posts')
const userResolvers = require('./users')
const commentsResolvers = require('./comments');
const Post = require('../../models/postModel')
module.exports ={
    Query:{
        ...postsResolvers.Query,
        ...userResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation

    },
    User:{
        posts: async(parent,args)=>{
            try {
                return await Post.find({user: parent.id})
            } catch (error) {
                console.log(error);
            }
        }
    },
   
}