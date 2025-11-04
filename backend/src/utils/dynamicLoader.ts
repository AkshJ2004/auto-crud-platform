import fs from 'fs';
import path from 'path';
import { Router, Application } from 'express';
import { applyCrudRoutes } from '../services/crudService';

export const loadDynamicRoutes = (app: Application) => {
  const modelsDir = path.join(__dirname, '../models');

  // ✅ Auto-create folder if missing
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
    console.log('📁 Created models directory:', modelsDir);
  }

  const files = fs.readdirSync(modelsDir);

  if (files.length === 0) {
    console.log('⚠️ No model files found. Add JSON model files to /src/models.');
    return;
  }

  files.forEach((file) => {
    const modelFile = path.join(modelsDir, file);
    const model = JSON.parse(fs.readFileSync(modelFile, 'utf-8'));
    const router = Router();
    applyCrudRoutes(router, model);
    app.use(`/api/${model.name.toLowerCase()}s`, router);
  });

  console.log('✅ Dynamic routes loaded for:', files.map(f => f.replace('.json', '')));
};
