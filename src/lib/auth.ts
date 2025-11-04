import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { AdminUser } from '@/types';

const ADMIN_USERS_PATH = path.join(process.cwd(), 'data', 'admin-users.json');
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'voa-secret-key-change-in-production-2025'
);

interface AdminUsersData {
  users: Array<AdminUser & { password: string }>;
}

/**
 * Get all admin users
 */
async function getAdminUsers(): Promise<Array<AdminUser & { password: string }>> {
  try {
    const fileContents = await fs.readFile(ADMIN_USERS_PATH, 'utf8');
    const data: AdminUsersData = JSON.parse(fileContents);
    return data.users || [];
  } catch {
    return [];
  }
}

/**
 * Verify admin credentials
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return null;
  }
  
  // For demo purposes, also accept plain password "admin123"
  const isValidPassword = 
    await bcrypt.compare(password, user.password) ||
    password === 'admin123';
  
  if (!isValidPassword) {
    return null;
  }
  
  // Return user without password
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Create JWT token for authenticated user
 */
export async function createToken(user: AdminUser): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  
  return token;
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = verified.payload as any;
    
    return {
      id: payload.id,
      username: payload.username,
      name: payload.username,
      email: '',
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/**
 * Hash password (for creating new admin users)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Get user from request cookies
 */
export function getTokenFromCookies(cookies: string | undefined): string | null {
  if (!cookies) return null;
  
  const match = cookies.match(/auth-token=([^;]+)/);
  return match ? match[1] : null;
}
