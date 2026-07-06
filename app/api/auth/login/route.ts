import { NextRequest, NextResponse } from 'next/server';

const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'manager@example.com',
    password: 'password123',
    name: 'Manager User',
    role: 'manager' as const,
  },
  {
    id: '3',
    email: 'employee@example.com',
    password: 'password123',
    name: 'Employee User',
    role: 'employee' as const,
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user (demo only - replace with actual database call)
    const user = DEMO_USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate a mock token
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    return NextResponse.json(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
