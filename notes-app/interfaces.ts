export interface NewNote {
  title: string;
  content: string;
}

export interface NoteType extends NewNote {
  id: number;
}

export interface UpdateableNote {
  id: number;
  title?: string;
  content?: string;
}

export interface NotesState {
  notes: NoteType[];
  searchTerm: string;
  idOfNoteToDelete: number | undefined;
}

export interface Profile {
  firstName: string;
  lastName?: string;
}

export interface QueryResponse {
  status?: number;
  success?: boolean;
  message?: string;
  notes?: NoteType[];
  note?: NoteType[];
  error?: string;
}
