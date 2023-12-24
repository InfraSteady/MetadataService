const { getConnection } = require("../db/connection.js");
const {
    insertIntoProjectsTable,
    insertIntoUserProjectMapTable,
    updateProjectName,
    updateProjectDescription,
    deleteFromProjectTable,
    deleteFromUserProjectMapTable,
    getProjectByUserId,
} = require("../db/sql.js");

const getProject = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(getProjectByUserId, [req.user_id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error while getting data:", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const createProject = async (req, res) => {
    try {
        const connection = await getConnection();
        const reqBody = req.body;
        const created_at = Math.floor(Date.now() / 1000);
        const [result] = await connection.query(insertIntoProjectsTable, [
            reqBody.project_name,
            reqBody.project_description,
            created_at,
            created_at,
        ]);
        const project_id = result.insertId;
        await connection.query(insertIntoUserProjectMapTable, [req.user_id, project_id]);
        res.status(201).json({
            message: "Project Created successfully",
            project_id,
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const editProjectNameOrDescription = async (req, res) => {
    try {
        const connection = await getConnection();
        const reqBody = req.body;
        if (reqBody.project_name) {
            await connection.query(updateProjectName, [reqBody.project_name, reqBody.project_id]);
        }
        if (reqBody.project_description) {
            await connection.query(updateProjectDescription, [reqBody.project_description, reqBody.project_id]);
        }
        res.status(200).json({
            message: "Project Updated successfully",
        });
    } catch (error) {
        console.error("Error while updating data: ", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const DeleteProject = async (req, res) => {
    try {
        const connection = await getConnection();
        const reqBody = req.body;
        await connection.query(deleteFromProjectTable, [reqBody.project_id]);
        await connection.query(deleteFromUserProjectMapTable, [req.user_id, project_id]);
        res.status(200).json({
            message: "Project Deleted successfully",
        });
    } catch (error) {
        console.error("Error while Deleting data: ", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

module.exports = { getProject, createProject, editProjectNameOrDescription, DeleteProject };
