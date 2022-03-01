const Post = require('../../models/postModel')
const checkAuth = require('../../utils/check-auth')
const {AuthenticationError} = require("apollo-server")
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
        async createPost(_,{body}, context){
                const user = checkAuth(context)
                if (body.trim() === '') {
                    throw new Error('Post body must not be empty');
                  }
            
                  const newPost = new Post({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString()
                  });
            
                  const post = await newPost.save();
            
                    return post;
                },
                async deletePost(_, { postId }, context) {
                  const user = checkAuth(context);
            
                  try {
                    const post = await Post.findById(postId);
                    if (user.username === post.username) {
                      await post.delete();
                      return 'Post deleted successfully';
                    } else {
                      throw new AuthenticationError('Action not allowed');
                    }
                  } catch (err) {
                    throw new Error(err);
                  }
                },
                async likePost(_, { postId }, context) {
                  const { username } = checkAuth(context);
            
                  const post = await Post.findById(postId);
                  if (post) {
                    if (post.likes.find((like) => like.username === username)) {
                      // Post already likes, unlike it
                      post.likes = post.likes.filter((like) => like.username !== username);
                    } else {
                      // Not liked, like post
                      post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                      });
                    }
            
                    await post.save();
                    return post;
                  } else throw new UserInputError('Post not found');
                }
    }
   
}

module.exports= resolvers