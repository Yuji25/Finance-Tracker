import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import categoryRouter from './routes/category.routes.js';
import peopleRouter from './routes/people.routes.js';
import transactionRouter from './routes/transaction.routes.js';
import analyticsRouter from './routes/analytics.routes.js';

dotenv.config();

const app = express();


// Middlewares
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://finance-tracker-pied-omega.vercel.app" // deployed frontend
];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://finance-tracker-pied-omega.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/people", peopleRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/analytics", analyticsRouter);


// Checking backend is running
app.get("/run", (req, res) => {
    res.send("Backend is running");
})


// App running 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})