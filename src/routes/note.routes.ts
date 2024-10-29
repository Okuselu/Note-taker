import express, { Router, Request, Response, NextFunction } from 'express';
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
} from '../controllers/note.controller';
const router = Router();
router.get('/notes', getAllNotes);          
router.get('/notes/:id', getNoteById);       
router.post('/notes', createNote);          
router.put('/notes/:id', updateNote);        
router.delete('/notes/:id', deleteNote);     

export default router;
