const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Route to get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Route to create a new post
router.post('/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;
