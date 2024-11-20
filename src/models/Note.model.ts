import mongoose from 'mongoose';
import { INote } from '../utils/interface';

const noteSchema = new mongoose.Schema<INote>({
    title: { type: String, required: true, trim: true},
    content: { type: String, required: true, trim: true},
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

export default Note;
