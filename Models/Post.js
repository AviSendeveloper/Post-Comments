const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const Post = model('post', postSchema);

module.exports = Post;
