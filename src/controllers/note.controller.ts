import { Request, Response, NextFunction } from "express";
import Note from "../models/Note.model";

// CRUD: Create a new note
export const createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Provide content and title" });
    }
    const newNote = await Note.create({ title, content });
    res.status(201).json({ message: "Note created successfully", data: newNote });
  } catch (error: any) {
    next(error);
  }
};
// CRUD: Get all notes
export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await Note.find();
    console.log('Retrieved notes:', notes);
    if (!notes) {
      throw new Error("not found");
    }
    res.status(200).json({
      message: "Successful",
      data: notes,
      error: false,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", data: null, error: true });
  }
};
// CRUD: get a specific note
export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.status(200).json({message: "Successful", data: note, error: false});
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

// CRUD: Delete a note by ID
export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      throw new Error("note not found");
    }
    res.status(200).json({
      message: "Note deleted successfully",
      data: null,
      error: false
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", data: null, error: true });
  }
};

//CRUD: update note
export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      throw new Error("Please provide title and content");
    }

    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      throw new Error("Note not found or update not successful");
    }
    console.log("Updated note:", updatedNote);
    
    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
      error: false,
    });
  } catch (error: any) {
    console.error("Error updating note:", error.message);
    next(error); 
  }
};
