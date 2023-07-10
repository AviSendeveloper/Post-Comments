const Post = require("../Models/Post");

exports.index = async (req, res) => {
    const posts = await Post.find({});
    return res.status(200).json({
        status: true,
        data: posts,
    });
};

exports.find = async (req, res) => {
    try {
        const id = req.body.id ?? req.query.id;
        const post = await Post.find({ _id: id });
        return res.status(200).json({
            status: true,
            data: post,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        let { title, url='' } = req.body;
        if (url === '') {
            url = title.toLowerCase().split(' ').join('-');
        }
        const user = req.user;
        const insertdPost = await Post.create({ title, url, userId: user._id });
        return res.status(200).json({
            status: true,
            data: insertdPost,
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: false,
            data: null,
        });
    }
};

exports.update = async (req, res) => {
    try {
        let { title, url='' } = req.body;
        if (url === '') {
            url = title.toLowerCase().split(' ').join('-');
        }
        const updatedPost = await Post.findByIdAndUpdate(
            { _id: req.body.id },
            { title, url },
            { new: true }
        );
        return res.status(200).json({
            status: true,
            data: updatedPost,
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: false,
            data: null,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedPost = await Post.deleteOne({ _id: id });
        return res.status(200).json({
            status: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
        });
    }
};
