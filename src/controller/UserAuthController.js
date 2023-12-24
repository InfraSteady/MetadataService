const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../db/connection.js");

const { insertIntoUser, findUserByEmail } = require("../db/sql.js");

const signUpController = async (req, res) => {
    try {
        const email = req.body.email;
        const fname = req.body.fname;
        const lname = req.body.lname;
        let password = req.body.password;
        if (!email || !password || !fname || !lname) {
            return res.status(401).send();
        }
        const hash = await bcrypt.hash(password, 8);
        const connection = await getConnection();
        const addUser = await connection.query(insertIntoUser, [email, fname, lname, hash]);
        const jsontoken = jwt.sign({ user_id: addUser.insertId }, process.env.SECRET_KEY);

        res.status(201).json({ token: jsontoken });
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
};

const loginController = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const connection = await getConnection();
        const user = await connection.query(findUserByEmail, [email]);

        if (!user) {
            throw new Error("Unable to Login!");
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Unable to Login!");
        }
        const jsontoken = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        res.status(200).json({ token: jsontoken }); //return res.redirect('/mainpage') ;
    } catch (e) {
        console.log(e);
        return res.status(401).send({
            message: "Invalid email or password",
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
