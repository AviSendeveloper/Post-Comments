const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretToken = process.env.SECRET_KEY;

exports.getToken = async (data) => {
    const token = jwt.sign({ ...data }, secretToken, {
        expiresIn: "30d",
    });

    return token;
};

exports.varifyToken = async (token) => {
    try {
        const result = await jwt.verify(token, secretToken);
        return result;
    } catch (error) {
        throw new Error("Invalid token");
    }
};
