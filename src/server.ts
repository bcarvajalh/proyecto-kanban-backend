import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import 'dotenv/config';
import projectRoutes from './routes/project.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});