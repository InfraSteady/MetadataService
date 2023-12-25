const express = require("express");
const app = express();
const userAuthRouter = require("./router/userAuthRouter.js");
const projectRouter = require("./router/projectsRouter.js");
const serviceTestsRouter = require("./router/serviceTestsRouter.js");
const agentsRouter = require("./router/agentsRouter.js");

require("dotenv").config();

app.use(express.json());

app.use(userAuthRouter);
app.use(projectRouter);
app.use(serviceTestsRouter);
app.use(agentsRouter);

app.listen(process.env.PORT, () => {
    console.log(`MetaData Microservice app listening on port ${process.env.PORT}`);
});
