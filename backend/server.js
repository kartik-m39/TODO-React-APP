const express = require('express');
const { connectDb } = require('./db');
const cors = require('cors');
const { authenticate } = require('./middleware/auth');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todos')

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json())
connectDb();

app.use("/api/user", userRouter);
app.use("/api/todos", authenticate, todoRouter);

app.listen(PORT, () => console.log(`Server is up on PORT: ${PORT}`));