const jwt = require("jsonwebtoken");

const { getConnection } = require("../db/connection.js");
const { findUserById } = require("../db/sql.js");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", ""); // extract the token
        const decode = jwt.verify(token, process.env.JWT_SECRET); // verity the token with the string
        const connection = await getConnection();
        const user = await connection.query(findUserById, [decode.user_id]); // verity whether a user exist with the id

        if (!user) {
            throw new Error("");
        }
        req.user_id = user.id; // set the user_id with req, so that later we dont have to fetch user object again
        next();
    } catch (e) {
        res.status(401).send({ error: "Please Authenticate" });
    }
};

module.exports = auth;
