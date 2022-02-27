const Post = require('../../models/postModel')
const resolvers = {
    Query:{
        allPosts: async ()=> {
            try {
                return await Post.find()
            } catch (error) {
                console.log(error);
            }
        }
    }
   
}

module.exports= resolvers