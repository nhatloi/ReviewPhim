const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const auth = require('../middleware/auth')

//=================================
//             Subscribe
//=================================

router.post("/saveComment", auth, (req, res) => {

    const {comment} = req.body
    const newComment= new Comment(comment)
    newComment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});

router.post("/removeComment",auth, async(req, res) => {

    const {commentId} = req.body
    try {
        await Comment.findByIdAndDelete(commentId)
        res.status(200).json({ msg:"remove Success!"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }

});


module.exports = router;
