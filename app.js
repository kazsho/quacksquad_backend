const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const toolRouter = require('./routes/tool_routes');
const userRouter = require('./routes/user_routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.use("/tools", toolRouter);
app.use("/users", userRouter);

module.exports = app;