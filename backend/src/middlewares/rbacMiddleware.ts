import { Request, Response, NextFunction } from 'express';

export const rbacCheck = (action: string, model: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const role = user.role;
    const permissions = model.rbac?.[role] || [];

    if (permissions.includes('all') || permissions.includes(action)) next();
    else return res.status(403).json({ message: 'Forbidden: No permission' });
  };
};
