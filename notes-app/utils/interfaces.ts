export interface NewNote {
  title: string;
  content: string;
}

export interface NoteType extends NewNote {
  id: number;
  userId: number;
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

export interface UserType {
  id: number;
  username: string;
  password: string;
}

export interface Profile {
  loggedInUser: UserType | null;
  notes: NoteType[];
}

export interface SiteInfo {
  loading: boolean;
  message: string;
}

export interface QueryResponse {
  status?: number;
  success?: boolean;
  message?: string;
  notes?: NoteType[];
  note?: NoteType[];
  error?: string;
}

export type RootStackParams = {
  Home: undefined;
  Profile: undefined;
  Note: { id: number } | undefined;
  Register: undefined;
  Login: undefined;
};
