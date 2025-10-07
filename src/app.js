import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import '../src/config/database.js'; // ensures DB is initialized
import newsRoutes from './routes/newsRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import userInteractionRoutes from './routes/userInteractionRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import epaperRoutes from './routes/epaperRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('📰 News Platform Backend (SQLite3) running!'));

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/search', searchRoutes);
app.use('/api', userInteractionRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/epaper', epaperRoutes);
app.use('/api/notifications', notificationRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
