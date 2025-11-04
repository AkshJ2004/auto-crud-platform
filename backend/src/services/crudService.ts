import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const prisma = new PrismaClient();

export const applyCrudRoutes = (router: Router, model: any) => {
  const name = model.name.toLowerCase();

  // CREATE
  router.post('/', async (req: Request, res: Response) => {
    try {
      const data = await (prisma as any)[name].create({ data: req.body });
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });

  // READ ALL
  router.get('/', async (req: Request, res: Response) => {
    try {
      const data = await (prisma as any)[name].findMany();
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });

  // UPDATE
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const data = await (prisma as any)[name].update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });

  // DELETE
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      await (prisma as any)[name].delete({ where: { id: Number(req.params.id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });
};
