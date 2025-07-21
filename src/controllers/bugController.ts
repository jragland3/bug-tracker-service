import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getBugs = async (_req: Request, res: Response) => {
    try {
        const bugs = await prisma.bug.findMany();
        res.json(bugs);
    } catch (error: any) {
        console.error('Error fetching bugs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createBug = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const newBug = await prisma.bug.create({
            data: {
                title,
                description,
            },
        });
        res.status(201).json(newBug);
    } catch (error: any) {
        console.error('Error creating bug:', error);
        res.status(500).json({ error: 'Could not create bug' })
    }
};

export const deleteBug = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedBug = await prisma.bug.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(204).send();
    } catch (error: any) {
        console.error('Error deleting bug:', error);

        if (
          error.code == 'P2025' ||
          error.message.includes('No Bug found')
        ) {
          res.status(404).json({ error: 'Bug not found' });
        }
        
        res.status(500).json({ error: 'Failed to delete bug' });
    }
};

export const updateBug = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, assignedTo } = req.body;

  try {
    const updateBug = await prisma.bug.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        assignedTo
      },
    });

    res.json(updateBug);
  } catch (err) {
    console.error(err);
    res.status(500).json({  error: 'Could not update bug' });
  }
};
