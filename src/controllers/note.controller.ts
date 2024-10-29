import { Request, Response, NextFunction } from "express";
import Note from "../models/Note.model";
// CRUD: Create a new note
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const { title, content } = req.body;

  if (!title || !content) {
    throw new Error("Provide content and title");
  }
  try {
    const newNote = await Note.create({ title, content });
    if (!newNote) {
      throw new Error("invalid entry");
    }
    res.status(201).json({
      message: "Note created successfully",
      data: newNote,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating note",
      data: null,
      error: true,
    });
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
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title && !content) {
      throw new Error("Please provide title and content")
    }
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );
    //if !note
    if (!updatedNote) {
    throw new Error("Update not successful")
    }
    //return updated note
    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
      error: false
    },
);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
