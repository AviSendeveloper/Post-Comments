const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            set: (e) => e.toLowerCase().trim(),
            required: [true, "email required"],
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;