const { varifyToken } = require("../Utils/jwt");

module.exports = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (!bearerHeader) throw new Error("Authorization must be there");
        
        const token = bearerHeader.split(" ")[1];
        const userDetails = await varifyToken(token);
        req.user = userDetails._doc;

        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: error.message,
        });
    }
};
