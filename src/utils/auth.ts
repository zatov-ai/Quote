import { User } from '../types';

const STORAGE_KEY = 'zatov_auth';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
}

// Mock user database (in production, this would be handled by a backend)
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@zatov.ai',
    password: 'demo123',
    firstName: 'Demo',
    lastName: 'User',
    company: 'Zatov AI',
    createdAt: new Date()
  }
];

export async function login(credentials: LoginCredentials): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.find(
    u => u.username === credentials.username && u.password === credentials.password
  );
  
  if (!user) {
    throw new Error('Invalid username or password');
  }
  
  const { password, ...userWithoutPassword } = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
}

export async function signup(data: SignupData): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Check if username or email already exists
  const existingUser = mockUsers.find(
    u => u.username === data.username || u.email === data.email
  );
  
  if (existingUser) {
    throw new Error('Username or email already exists');
  }
  
  const newUser: User & { password: string } = {
    id: crypto.randomUUID(),
    username: data.username,
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    company: data.company,
    phone: data.phone,
    createdAt: new Date()
  };
  
  mockUsers.push(newUser);
  
  const { password, ...userWithoutPassword } = newUser;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const user = JSON.parse(stored);
    return {
      ...user,
      createdAt: new Date(user.createdAt)
    };
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}