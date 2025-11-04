import fs from 'fs';
import path from 'path';

const modelsPath = path.join(__dirname, '../models');

export const saveModelFile = (modelData: any) => {
  if (!fs.existsSync(modelsPath)) fs.mkdirSync(modelsPath);
  const filePath = path.join(modelsPath, `${modelData.name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(modelData, null, 2));
  return filePath;
};

export const getAllModels = () => {
  const files = fs.readdirSync(modelsPath);
  return files.map((file) =>
    JSON.parse(fs.readFileSync(path.join(modelsPath, file), 'utf-8'))
  );
};
