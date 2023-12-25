const insertIntoUser = "INSERT INTO users(`email`, `fname`, `lname`, `password_hash`) VALUES (?,?,?,?)";
const findUserById = "select * FROM `users` WHERE `id` = ?";
const findUserByEmail = "select * FROM `users` WHERE `email` = ?";

const insertIntoProjectsTable = "INSERT INTO projects(`project_name`, `project_description`, `user_id`) VALUES (?,?,?)";
const deleteFromProjectTable = "DELETE FROM projects WHERE `id` = ?";

const selectIDProjectServiceTestMapTableByProjectId =
    "SELECT `id` FROM project_service_test_map WHERE `project_id` = ?";
const deleteFromProjectServiceTestMapTableByProjectId = "DELETE FROM project_service_test_map WHERE `project_id` = ?";

const insertIntoServiceTestRunnerDataTable =
    "INSERT INTO service_test_runner_data(`service_test_name`, `service_test_endpoint`, `service_test_request_type`, `service_test_request_header` , `service_test_request_body`, `service_test_request_query_param`, `interval`, `degrade_response_time`,`failed_response_time`, `next_run_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
const insertIntoProjectServiceTestMapTable =
    "INSERT INTO project_service_test_map(`service_test_id`, `project_id`) VALUES (?,?)";
const insertIntoAgentProjectServiceTestMapTable =
    "INSERT INTO agent_project_service_test_map(`agent_id`, `project_service_test_map_id`) VALUES (?,?)";

const deleteFromServiceTestRunnerDataTable = "DELETE FROM service_test_runner_data WHERE `id` = ?";
const selectIDProjectServiceTestMapTable = "SELECT `id` FROM project_service_test_map WHERE `service_test_id` = ?";
const deleteFromProjectServiceTestMapTable = "DELETE FROM project_service_test_map WHERE `service_test_id` = ?";
const deleteFromgentProjectServiceTestMapTable =
    "DELETE FROM agent_project_service_test_map WHERE `project_service_test_map_id` IN (?)";

const insertIntoAgentsTable =
    "INSERT INTO agents(`agent_name`, `agent_description`,` agent_url`, `user_id`) VALUES (?,?,?,?)";
const deleteFromAgentsTable = "DELETE FROM `agents` WHERE `id` = ?";
const deleteFromgentProjectServiceTestMapTableByAgentId =
    "DELETE FROM `agent_project_service_test_map` WHERE `agent_id` = ?";

const getProjectByUserId =
    "SELECT p.`id` as project_id, p.`project_name`, p.`project_description` FROM `projects` p  WHERE p.`user_id` = ?";
const getAgentsByUserId =
    "SELECT a.`id`, a.`agent_name`, a.`agent_description`, a.`agent_url` ,a.`agent_status` , a.`agent_service_status`, a.`` FROM `agents` a  WHERE a.`user_id` = ?";
const getServiceTestsByUserId =
    "SELECT stm.`id` as service_test_id, stm.`service_test_name`, stm.`service_test_endpoint`, stm.`service_test_request_type`, stm.`service_test_request_header`, stm.`service_test_request_body`, stm.`service_test_request_query_param`, stm.`interval`, stm.`degrade_response_time`, stm.`failed_response_time`, stm.`test_status`, stm.`test_muted` FROM `service_test_metric_data` stm JOIN `project_service_test_map` pst ON stm.`id` = pst.`service_test_id` JOIN `projects` p ON pst.`project_id` =  p.`id` WHERE p.`user_id` = ? AND p.`id` = ?";

module.exports = {
    insertIntoUser,
    findUserById,
    findUserByEmail,
    insertIntoProjectsTable,
    deleteFromProjectTable,
    insertIntoServiceTestRunnerDataTable,
    insertIntoProjectServiceTestMapTable,
    insertIntoAgentProjectServiceTestMapTable,
    deleteFromServiceTestRunnerDataTable,
    deleteFromProjectServiceTestMapTable,
    selectIDProjectServiceTestMapTable,
    deleteFromgentProjectServiceTestMapTable,
    insertIntoAgentsTable,
    deleteFromAgentsTable,
    deleteFromgentProjectServiceTestMapTableByAgentId,
    getProjectByUserId,
    getAgentsByUserId,
    getServiceTestsByUserId,
    deleteFromProjectServiceTestMapTableByProjectId,
    selectIDProjectServiceTestMapTableByProjectId,
};
