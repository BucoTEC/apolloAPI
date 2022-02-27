const Post = require('../../models/postModel')
const resolvers = {
    Query:{
        allPosts: async ()=> {
            try {
                return await Post.find()
            } catch (error) {
                console.log(error);
            }
        },

        async getPost(_,{postId}){
            try {
                const post = await Post.findById(postId)
                if(post){

                    return post
                }else{
                    throw new Error('No post found')
                }
                
            } catch (err) {
                console.log(err);
                return err.message
            }
        }
    },
    Mutation:{
        async createPost(_,{body}){

        }
    }
   
}

module.exports= resolvers