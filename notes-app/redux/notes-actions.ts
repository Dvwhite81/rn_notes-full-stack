import { NewNote, NoteType } from '../utils/interfaces';
import notesService from '../services/notesService';
import { addNote, removeNote, setAllNotes, updateNote } from './notes-slice';
import { AppDispatch } from './store';
import { setUserNotes } from './profile-slice';
import { setLoading } from './site-slice';

export const fetchAllNotes = () => {
  return async (dispatch: AppDispatch) => {
    const result = await notesService.getAllNotes();
    const { success, message } = result;

    if (success) {
      const { notes } = result;
      dispatch(setAllNotes(notes));
    }

    return { success, message };
  };
};

export const fetchUserNotes = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    const result = await notesService.getAllNotes();
    const { success } = result;

    if (success) {
      const { notes } = result;
      const userNotes = notes.filter((n: NoteType) => n.userId === userId);
      dispatch(setUserNotes(userNotes));
    }
  };
};

export const addNewNote = (newNote: NewNote) => {
  return async (dispatch: AppDispatch) => {
    const result = await notesService.addNote(newNote);
    const { success, message } = result;

    if (success) {
      const { note } = result;
      dispatch(addNote(note));
      return { success, message, note };
    }

    return { success, message };
  };
};

export const editNote = (note: NoteType) => {
  return async (dispatch: AppDispatch) => {
    const result = await notesService.updateNote(note);
    const { success, message } = result;

    if (success) {
      const { note } = result;
      dispatch(updateNote(note));
    }

    return { success, message };
  };
};

export const deleteNote = (id: number) => {
  return async (dispatch: AppDispatch) => {
    const result = await notesService.deleteNote(id);
    const { success, message } = result;

    if (success) {
      const { notes } = result;
      dispatch(removeNote({ id }));
      dispatch(setAllNotes(notes));
    }

    return { success, message };
  };
};
