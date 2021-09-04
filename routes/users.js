const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
router.get("/", (req,res)=>{
    res.send("users up")
})
// update user

router.put("/:id",async (req, res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
      if(req.body.password){
          try{
              const salt = await bcrypt.genSalt(10)
          
              req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            catch (err){
                return res.status(500).json(err)
            }
      }
      try {
         const user = await User.findByIdAndUpdate(req.params.id,{
             $set: req.body
         }) ;
         res.status(200).json("Password updated")
      } catch (error) {
        return res.status(500).json(error)
      }
    }
    else {
        return res.status(403).json("Don't try to be the admin");
    }
})
// delete user

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });
// get user

router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
    //   const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// follow
// unfollow

module.exports = router  