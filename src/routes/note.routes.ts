import { Router } from 'express';
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from '../controllers/note.controller';
// import authMiddleware from '../middleware/AuthMiddleware';

const router = Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote); 
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;