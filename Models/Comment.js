const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        comment: {
            type: String,
        },
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            reqired: true,
        },
        parentCommentId: {
            type: String,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
