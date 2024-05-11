import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesState, NoteType, UpdateableNote } from '../utils/interfaces';

const initialState: NotesState = {
  notes: [],
  searchTerm: '',
  idOfNoteToDelete: undefined,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setAllNotes: (state, action: PayloadAction<NoteType[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<NoteType>) => {
      state.notes = [...state.notes, action.payload];
    },
    updateNote: (state, action: PayloadAction<UpdateableNote>) => {
      const { id, title, content } = action.payload;

      state.notes = state.notes.map((note) => {
        if (note.id === id) {
          const titleValue = title ?? note.title;
          const contentValue = content ?? note.content;
          return {
            id,
            title: titleValue,
            content: contentValue,
            userId: note.userId,
          };
        }

        return note;
      });
    },
    removeNote: (state, action: PayloadAction<{ id: number }>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
    },
    setSearchTerm: (state, action: PayloadAction<{ searchTerm: string }>) => {
      state.searchTerm = action.payload.searchTerm;
    },
    setIdOfNoteToDelete: (
      state,
      action: PayloadAction<{ id: number | undefined }>
    ) => {
      state.idOfNoteToDelete = action.payload.id;
    },
  },
});

export const {
  addNote,
  updateNote,
  removeNote,
  setAllNotes,
  setSearchTerm,
  setIdOfNoteToDelete,
} = notesSlice.actions;

export default notesSlice.reducer;
