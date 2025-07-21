import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bugRoutes from './routes/bugs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

export default app;
