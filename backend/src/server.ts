import express from 'express';
import cors from 'cors';
import { loadDynamicRoutes } from './utils/dynamicLoader';
import authRoutes from './routes/authRoutes';


const app = express();
app.use(cors());
app.use(express.json());


// Load all dynamic models on startup
loadDynamicRoutes(app);

app.listen(4000, () => console.log("Server running on port 4000"));
