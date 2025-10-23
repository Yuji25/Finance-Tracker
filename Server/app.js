import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import categoryRouter from './routes/category.routes.js';
import peopleRouter from './routes/people.routes.js';

dotenv.config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/people", peopleRouter);


// Checking backend is running
app.get("/run", (req, res) => {
    res.send("Backend is running");
})


// App running 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})