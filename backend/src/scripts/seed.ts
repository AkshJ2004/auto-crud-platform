import { prisma } from '../config/db';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        role: 'Admin'
      }
    });
    
    console.log('✅ Admin user created:', admin.username);

    // Create manager user
    const managerPassword = await bcrypt.hash('manager123', 10);
    const manager = await prisma.user.create({
      data: {
        username: 'manager',
        password: managerPassword,
        role: 'Manager'
      }
    });
    
    console.log('✅ Manager user created:', manager.username);

    // Create viewer user
    const viewerPassword = await bcrypt.hash('viewer123', 10);
    const viewer = await prisma.user.create({
      data: {
        username: 'viewer',
        password: viewerPassword,
        role: 'Viewer'
      }
    });
    
    console.log('✅ Viewer user created:', viewer.username);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();