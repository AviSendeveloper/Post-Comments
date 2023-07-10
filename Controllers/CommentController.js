const Comment = require("../Models/Comment");

exports.index = async (req, res) => {
    try {
        console.log(req);
        const comments = await Comment.find({});
        return res.status(200).json({
            status: true,
            data: comments,
        });
    } catch (error) {
        console.log("comment index", error);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

exports.find = async (req, res) => {
    try {
        const id = req.body.id ?? req.query.id;
        const comment = await Comment.find({ _id: id });
        return res.status(200).json({
            status: true,
            data: comment,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        const { comment, postId, parentCommentId } = req.body;
        const user = req.user;
        const insertedComment = await Comment.create({
            comment,
            postId,
            userId: user._id,
            parentCommentId,
        });
        return res.status(200).json({
            status: true,
            data: insertedComment,
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
        const { comment, postId, userId, parentCommentId } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            { _id: req.body.id },
            { comment, postId, parentCommentId },
            { new: true }
        );
        return res.status(200).json({
            status: true,
            data: updatedComment,
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
        const deletedComment = await Comment.deleteOne({ _id: id });
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
