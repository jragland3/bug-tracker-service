import request from 'supertest';
import app from '../index';
import prisma from '../lib/prisma';

beforeEach(async () => {
  await prisma.bug.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Bug API Endpoints', () => {
  let bugId: number;

  it("GET /api/bugs -> should return a list of bugs", async () => {
    // Create bug
    await prisma.bug.create({
      data: { title: 'Bug 1', description: 'description', status: 'open' },
    });

    const res = await request(app).get('/api/bugs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("POST /api/bugs -> should create a new bug", async () => {
    const res = await request(app).post("/api/bugs").send({
      title: 'Test bug',
      description: 'These are some bug details',
      status: 'open'
    });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test bug');

    bugId = res.body.id;
  });

  it("DELETE /api/bugs/:id -> should delete the specified bug", async () => {
    const bug = await prisma.bug.create({
      data: {
        title: 'Bug to Delete',
        description: 'This will be deleted',
        status: 'open'
      },
    });

    const res = await request(app).delete(`/api/bugs/${bug.id}`);
    expect(res.status).toBe(204);

    const deleted = await prisma.bug.findUnique({ where: { id: bug.id } });
    expect(deleted).toBeNull();
  });

  it("PUT /api/bugs/:id -> should update the specified bug", async () => {
    // Create bug
    const bug = await prisma.bug.create({
      data: {
        title: 'Old Title',
        description: 'Old description...',
        status: 'open',
      },
    });
    bugId = bug.id;

    // Wait for response
    const res = await request(app)
      .put(`/api/bugs/${bug.id}`)
      .send({
        title: 'Updated Title',
        description: 'Updated description',
        status: 'closed',
      });

    // Tests to check the response data
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Title');
    expect(res.body.description).toBe('Updated description');
    expect(res.body.status).toBe('closed');
  });
});
