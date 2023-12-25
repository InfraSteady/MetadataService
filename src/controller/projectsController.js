const { getConnection } = require("../db/connection.js");
const {
    insertIntoProjectsTable,
    deleteFromProjectTable,
    getProjectByUserId,
    selectIDProjectServiceTestMapTableByProjectId,
    deleteFromProjectServiceTestMapTableByProjectId,
    deleteFromgentProjectServiceTestMapTable,
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
        const [result] = await connection.query(insertIntoProjectsTable, [
            reqBody.project_name,
            reqBody.project_description,
            req.user_id,
        ]);
        const project_id = result.insertId;
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
        const { project_id, project_name, project_description } = req.body;
        const updateQuery =
            "UPDATE `projects` SET " +
            (project_name ? "project_name = ?, " : "") +
            (project_description ? "project_description = ?, " : "") +
            "WHERE `id` = ?";
        const values = [project_name, project_description, project_id].filter((value) => value !== undefined); // Filter out undefined values
        await connection.execute(updateQuery, values);
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
        const [rows] = await connection.query(selectIDProjectServiceTestMapTableByProjectId, [reqBody.project_id]);
        await connection.query(deleteFromProjectServiceTestMapTableByProjectId, [reqBody.service_test_id]);

        const project_service_test_map_id = rows.map((obj) => obj.id);
        await connection.query(deleteFromgentProjectServiceTestMapTable, [project_service_test_map_id]);
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
