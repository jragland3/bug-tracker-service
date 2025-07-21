import { Router, Request, Response, RequestHandler } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const bugs = await prisma.bug.findMany();
        res.json(bugs);
    } catch (error: any) {
        console.error('Error fetching bugs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
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
});

const deleteBug: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBug = await prisma.bug.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(deletedBug);
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

router.delete('/:id', deleteBug);

export default router;
