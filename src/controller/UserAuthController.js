const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../db/connection.js");

const { insertIntoUser, findUserByEmail } = require("../db/sql.js");

const signUpController = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(400).send("Email or password is Empty");
        }
        const hash = await bcrypt.hash(password, 8);
        const connection = await getConnection();
        const addUser = await connection.query(insertIntoUser, [email, hash]);
        const jsontoken = jwt.sign({ user_id: addUser[0].insertId }, process.env.JWT_SECRET_KEY);

        res.status(201).json({ token: jsontoken });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const loginController = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(400).send("Email or password is Empty");
        }
        const connection = await getConnection();
        const user = await connection.query(findUserByEmail, [email]);
        if (!user[0][0]) {
            return res.status(403).send("Email doesn't exist");
        }
        const isMatch = await bcrypt.compare(password, user[0][0].password_hash);
        if (!isMatch) {
            return res.status(403).send("You have Entered Invalid Password");
        }
        const jsontoken = jwt.sign({ user_id: user[0][0].id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ token: jsontoken }); //return res.redirect('/mainpage') ;
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};
const logoutController = async (req, res) => {
    try {
        req.user_id = null;
        return res.status(200).send({
            message: "You've been signed out!",
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
module.exports = { signUpController, loginController, logoutController };
