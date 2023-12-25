const { getConnection } = require("../db/connection.js");
const {
    insertIntoServiceTestRunnerDataTable,
    insertIntoProjectServiceTestMapTable,
    insertIntoAgentProjectServiceTestMapTable,
    deleteFromServiceTestRunnerDataTable,
    selectIDProjectServiceTestMapTable,
    deleteFromProjectServiceTestMapTable,
    deleteFromgentProjectServiceTestMapTable,
    getServiceTestsByUserId,
} = require("../db/sql.js");

const getSeviceTests = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(getServiceTestsByUserId, [req.user_id, req.query.project_id]); // project -id
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error while getting data:", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const createSeviceTests = async (req, res) => {
    try {
        const connection = await getConnection();
        const reqBody = req.body;
        const timestamp = Math.floor(Date.now() / 1000);
        const [result] = await connection.query(insertIntoServiceTestRunnerDataTable, [
            reqBody.service_test_name,
            reqBody.service_test_endpoint,
            reqBody.service_test_request_type,
            reqBody.service_test_request_header,
            reqBody.service_test_request_body,
            reqBody.service_test_request_query_param,
            reqBody.interval,
            reqBody.degrade_response_time,
            reqBody.failed_response_time,
            timestamp + reqBody.interval,
            timestamp,
        ]);

        const service_test_id = result.insertId;
        const [rows] = await connection.query(insertIntoProjectServiceTestMapTable, [
            service_test_id,
            reqBody.project_id,
        ]);
        const project_service_test_map_id = rows.insertId;
        await connection.query(insertIntoAgentProjectServiceTestMapTable, [
            reqBody.agent_id,
            project_service_test_map_id,
        ]);
        res.status(201).json({
            message: "Sevice Tests Created Successfully",
            service_test_id,
            project_service_test_map_id,
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const editSeviceTestsNameOrDescription = async (req, res) => {
    try {
        const connection = await getConnection();
        const {
            service_test_id,
            service_test_name,
            service_test_endpoint,
            service_test_request_type,
            service_test_request_header,
            service_test_request_body,
            service_test_request_query_param,
            interval,
            degrade_response_time,
            failed_response_time,
            test_status,
            test_muted,
        } = req.body;

        const updateQuery =
            "UPDATE service_test_runner_data SET " +
            (service_test_name ? "service_test_name = ?, " : "") +
            (service_test_endpoint ? "service_test_endpoint = ?, " : "") +
            (service_test_request_type ? "service_test_request_type = ? " : "") +
            (service_test_request_header ? "service_test_request_header = ? " : "") +
            (service_test_request_body ? "service_test_request_body = ? " : "") +
            (service_test_request_query_param ? "service_test_request_query_param = ? " : "") +
            (interval ? "interval = ? " : "") +
            (degrade_response_time ? "degrade_response_time = ? " : "") +
            (failed_response_time ? "failed_response_time = ? " : "") +
            (test_status ? "test_status = ? " : "") +
            (test_muted ? "test_muted = ? " : "") +
            "WHERE `id` = ?";
        const values = [
            service_test_name,
            service_test_endpoint,
            service_test_request_type,
            service_test_request_header,
            service_test_request_body,
            service_test_request_query_param,
            interval,
            degrade_response_time,
            failed_response_time,
            test_status,
            test_muted,
            service_test_id,
        ].filter((value) => value !== undefined); // Filter out undefined values
        const [result] = await connection.execute(updateQuery, values);
        console.log("Updated rows:", result.affectedRows);
        res.status(200).json({
            message: "Service Tests Updated successfully",
        });
    } catch (error) {
        console.error("Error while updating data: ", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const DeleteSeviceTests = async (req, res) => {
    try {
        const connection = await getConnection();
        const reqBody = req.body;
        await connection.query(deleteFromServiceTestRunnerDataTable, [reqBody.service_test_id]);
        const [rows] = await connection.query(selectIDProjectServiceTestMapTable, [reqBody.service_test_id]);
        await connection.query(deleteFromProjectServiceTestMapTable, [reqBody.service_test_id]);

        const project_service_test_map_id = rows.map((obj) => obj.id);
        await connection.query(deleteFromgentProjectServiceTestMapTable, [project_service_test_map_id]);
        res.status(200).json({
            message: "Service Tests Deleted successfully",
        });
    } catch (error) {
        console.error("Error while Deleting data: ", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

module.exports = { getSeviceTests, createSeviceTests, editSeviceTestsNameOrDescription, DeleteSeviceTests };
