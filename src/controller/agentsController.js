const { getConnection } = require("../db/connection.js");
const {
    insertIntoAgentsTable,
    deleteFromAgentsTable,
    deleteFromgentProjectServiceTestMapTableByAgentId,
    getAgentsByUserId,
} = require("../db/sql.js");

const getAgents = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(getAgentsByUserId, [req.user_id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error while getting data:", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const createAgents = async (req, res) => {
    try {
        const connection = await getConnection();
        const reqBody = req.body;
        const [result] = await connection.query(insertIntoAgentsTable, [
            reqBody.agent_name,
            reqBody.agent_description,
            reqBody.agent_url,
            req.user_id,
        ]);
        const agent_id = result.insertId;
        res.status(201).json({
            message: "Agent Created successfully",
            agent_id,
        });
    } catch (error) {
        console.error("Agent , Error inserting data:", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const editAgent = async (req, res) => {
    try {
        const connection = await getConnection();
        const { agent_id, agent_name, agent_description, agent_url } = req.body;

        const updateQuery =
            "UPDATE `agents` SET " +
            (agent_name ? "agent_name = ?, " : "") +
            (agent_description ? "agent_description = ?, " : "") +
            (agent_url ? "agent_url = ? " : "") +
            "WHERE `id` = ?";
        const values = [agent_name, agent_description, agent_url, agent_id].filter((value) => value !== undefined); // Filter out undefined values
        await connection.execute(updateQuery, values);
        res.status(200).json({
            message: "Agent Updated successfully",
        });
    } catch (error) {
        console.error("Agent, Error while updating data: ", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};
// before deleteing a agent we should check wheather agents is associated with a test that is enabled and has only one agent, i.e. the current agent
const deleteAgents = async (req, res) => {
    try {
        const connection = await getConnection();
        const reqBody = req.body;
        await connection.query(deleteFromAgentsTable, [reqBody.agent_id]);
        await connection.query(deleteFromgentProjectServiceTestMapTableByAgentId, [reqBody.agent_id]);
        res.status(200).json({
            message: "Agent Deleted successfully",
        });
    } catch (error) {
        console.error("Agent , Error while Deleting data: ", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

module.exports = { getAgents, createAgents, editAgent, deleteAgents };
