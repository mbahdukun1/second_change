import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());  // Middleware untuk parsing JSON request body

// Routes
app.use('/', userRoutes);  // Semua routes terkait user berada di /api/users

// Start the server
const PORT = process.env.PORT || 3033;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
