const router = require("express").Router();
const Post = require("../models/Post")

// Creating a post
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update a post

router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete("/:id", async (req, res)=>{
      try {
          const post = await Post.findById(req.params.id)
          if(post.userId === req.body.userId ){
             await  post.deleteOne()
             res.status(200).json("Post Deleted")
            
            }
            else{
                res.status(403).json("You cannot delete this post")
            }
      } catch (error) {
          res.status(500).json("Post Not Found")
      }
  })
module.exports = router;