import fs from 'fs';
import path from 'path';

export const readJSON = (filePath: string) => {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

export const writeJSON = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
