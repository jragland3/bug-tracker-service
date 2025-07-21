import { Router } from 'express';
import { 
    getBugs,
    createBug, 
    deleteBug, 
    updateBug 
} from '../controllers/bugController';

const router = Router();

router.get('/', getBugs);
router.post('/', createBug);
router.delete('/:id', deleteBug);
router.put('/:id', updateBug);

export default router;
