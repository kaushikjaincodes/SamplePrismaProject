import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query'],
});

export async function GET() {
  const tasks = await prisma.task.findMany();
  return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(request: Request) {
  const { title } = await request.json();
  
  if (!title) {
    return new Response(JSON.stringify({ message: 'Title is required' }), { status: 400 });
  }

  const newTask = await prisma.task.create({
    data: {
      title,
    },
  });

  return new Response(JSON.stringify(newTask), { status: 201 });
}
