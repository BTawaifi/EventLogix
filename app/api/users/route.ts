import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export async function POST(req: NextRequest) {
  const validation = userSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  const { name, email } = validation.data;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  const search = searchParams.get('search') || '';

  const skip = (Number(page) - 1) * Number(limit);

  const filters: any = {};
  if (search) {
    filters.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const users = await prisma.user.findMany({
      where: filters,
      skip,
      take: Number(limit),
      orderBy: { name: 'asc' },
    });

    const totalUsers = await prisma.user.count({ where: filters });

    return NextResponse.json({ users, total: totalUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 400 });
  }
}
