import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';
import { AuthRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'trungluanmmo_secret_jwt_key_2026_super_secure';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ success: false, message: 'Vui lòng cung cấp username và password' });
      return;
    }

    // Check if user exists in database
    let admin = await prisma.adminUser.findUnique({
      where: { username },
    });

    // If no admin user exists yet, check against .env fallback default and auto-create
    if (!admin) {
      const defaultUser = process.env.ADMIN_USERNAME || 'admin';
      const defaultPass = process.env.ADMIN_PASSWORD || 'adminpassword123';

      if (username === defaultUser && password === defaultPass) {
        const hashedPassword = await bcrypt.hash(defaultPass, 10);
        admin = await prisma.adminUser.create({
          data: {
            username: defaultUser,
            password: hashedPassword,
          },
        });
      } else {
        res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
        return;
      }
    } else {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
        return;
      }
    }

    // Sign JWT token (valid for 7 days)
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server khi đăng nhập', error: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
      return;
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, createdAt: true },
    });

    if (!admin) {
      res.status(404).json({ success: false, message: 'Tài khoản không tồn tại' });
      return;
    }

    res.json({ success: true, user: admin });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};
