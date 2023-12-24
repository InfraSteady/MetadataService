const insertIntoUser = "INSERT INTO users(`email`, `fname`, `lname`, `password_hash`) VALUES (?,?,?,?)";
const findUserById = "select * FROM `users` WHERE `id` = ?";
const findUserByEmail = "select * FROM `users` WHERE `email` = ?";

const insertIntoProjectsTable =
    "INSERT INTO projects(`project_name`, `project_description`, `created_at`, `updated_at`) VALUES (?,?,?,?)";
const insertIntoUserProjectMapTable = "INSERT INTO user_project_map(`user_id`, `project_id`) VALUES (?,?)";
const updateProjectName = "UPDATE `projects` SET `project_name`= ? WHERE `id` = ?";
const updateProjectDescription = "UPDATE `projects` SET `project_name`= ? WHERE `id` = ?";
const deleteFromProjectTable = "DELETE FROM projects WHERE `id` = ?";
const deleteFromUserProjectMapTable = "DELETE FROM user_project_map WHERE `user_id` = ? AND `project_id` = ?";

const insertIntoServiceTestRunnerDataTable =
    "INSERT INTO service_test_runner_data(`service_test_name`, `service_test_endpoint`, `service_test_request_type`, `service_test_request_header` , `service_test_request_body`, `service_test_request_query_param`, `interval`, `degrade_response_time`,`failed_response_time`, `next_run_at`, `last_run_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
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
    "INSERT INTO agents(`agent_name`, `agent_description`,` agent_url`, `created_at`, `user_id`) VALUES (?,?,?,?,?)";
const deleteFromAgentsTable = "DELETE FROM `agents` WHERE `id` = ?";
const deleteFromgentProjectServiceTestMapTableByAgentId =
    "DELETE FROM `agent_project_service_test_map` WHERE `agent_id` = ?";

const getProjectByUserId =
    "SELECT p.`id` as project_id, p.`project_name`, p.`project_description` FROM `projects` p JOIN `user_project_map` upm ON p.`id` = upm.`project_id` WHERE upm.`user_id` = ?";
const getAgentsByUserId =
    "SELECT a.`id`, a.`agent_name`, a.`agent_description`, a.`agent_url` ,a.`agent_status` , a.`agent_service_status`, a.`` FROM `agents` a  WHERE a.`user_id` = ?";
const getSrviceTestsByUserId =
    "SELECT stm.`id` as service_test_id, stm.`service_test_name`, stm.`service_test_endpoint`, stm.`service_test_request_type`, stm.`service_test_request_header`, stm.`service_test_request_body`, stm.`service_test_request_query_param`, stm.`interval`, stm.`degrade_response_time`, stm.`failed_response_time`, stm.`test_status`, stm.`test_muted` FROM `service_test_metric_data` stm JOIN `project_service_test_map` pst ON stm.`id` = pst.`service_test_id` JOIN `user_project_map` ON pst.`project_id` =  upm.`project_id` WHERE upm.`user_id` = ?";

module.exports = {
    insertIntoUser,
    findUserById,
    findUserByEmail,
    insertIntoProjectsTable,
    insertIntoUserProjectMapTable,
    updateProjectName,
    updateProjectDescription,
    deleteFromProjectTable,
    deleteFromUserProjectMapTable,
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
    getSrviceTestsByUserId,
};
