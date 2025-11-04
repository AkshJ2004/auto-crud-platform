import express from 'express';
import { saveModelFile, getAllModels } from '../services/modelService';
import { loadDynamicRoutes } from '../utils/dynamicLoader';

const router = express.Router();

// Publish a model (creates file + dynamic routes)
router.post('/publish', async (req, res) => {
  const model = req.body;
  saveModelFile(model);
  loadDynamicRoutes(req.app);
  res.json({ message: 'Model published successfully' });
});

// List all models
router.get('/models', (req, res) => {
  const models = getAllModels();
  res.json(models);
});

export default router;
