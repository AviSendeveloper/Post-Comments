const Post = require('../Models/Post');

exports.index = async (req, res) => {
    const posts = await Post.find({});
    return res.status(200).json({
        status: true,
        data: posts,
    });
};
