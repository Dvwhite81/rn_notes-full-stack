import { NewNote, NoteType } from '../utils/interfaces';
import notesService from '../services/notesService';
import { addNote, removeNote, setAllNotes, updateNote } from './notes-slice';
import { AppDispatch } from './store';

export const fetchAllNotes = () => {
  return async (dispatch: AppDispatch) => {
    const notes = await notesService.getAllNotes();
    dispatch(setAllNotes(notes));
  };
};

export const addNewNote = (newNote: NewNote) => {
  return async (dispatch: AppDispatch) => {
    const response = await notesService.addNote(newNote);
    const noteWithId = response;
    dispatch(addNote(noteWithId));
    return noteWithId;
  };
};

export const editNote = (note: NoteType) => {
  return async (dispatch: AppDispatch) => {
    await notesService.updateNote(note);
    dispatch(updateNote(note));
  };
};

export const deleteNote = (id: number) => {
  return async (dispatch: AppDispatch) => {
    await notesService.deleteNote(id);
    dispatch(removeNote({ id: id }));
  };
};
