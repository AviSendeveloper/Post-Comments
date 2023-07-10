const bcrypt = require("bcrypt");
const User = require("../Models/User");
const { getToken } = require("../Utils/jwt");

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body || req.query;
        // console.log(req.body || req.query);
        // console.log(`Name: ${name} Email: ${email} Password: ${password}`);

        // validation logic requuired

        const hashPassword = await bcrypt.hash(password, 10);
        const userResult = await User.create({
            name: name,
            email: email,
            password: hashPassword,
        });

        return res.status(200).json({
            status: true,
            data: userResult,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: null,
        });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body || req.query;

        // check user exist or not
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(200).json({
                status: false,
                data: null,
                message: "User need to register first",
            });
        }

        // check password
        const checkStatus = await bcrypt.compare(password, user.password);
        if (!checkStatus) {
            return res.status(400).json({
                status: false,
                data: null,
                message: "Invalid email or password",
            });
        }

        const token = await getToken(user);

        return res.status(200).json({
            status: true,
            data: user,
            token: token,
            message: "User authenticated successfully",
        });
    } catch (error) {
        console.log('login', error);
        return res.status(500).json({
            status: false,
            data: null
        });
    }
};
