import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import supabase from './config/supabase.js';

dotenv.config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());


// Checking backend is running
app.get("/run", (req, res) => {
    res.send("Backend is running");
})

// --- 🔍 TEST SUPABASE CONNECTION ---
app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Connected to Supabase ✅',
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Supabase connection failed ❌',
      error: err.message,
    });
  }
});


// App running 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})