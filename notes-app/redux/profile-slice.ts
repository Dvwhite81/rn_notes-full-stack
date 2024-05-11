import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteType, Profile, UserType } from '../utils/interfaces';

const initialState: Profile = {
  loggedInUser: null,
  notes: [],
};

export const profileSlice = createSlice({
  name: 'profileInfo',
  initialState,
  reducers: {
    saveProfileInfo: (state, action: PayloadAction<Profile>) => {
      const { loggedInUser, notes } = action.payload;
      state.loggedInUser = loggedInUser;
      state.notes = notes;
    },
    setLoggedInUser: (state, action: PayloadAction<UserType>) => {
      state.loggedInUser = action.payload;
    },
    setUserNotes: (state, action: PayloadAction<NoteType[]>) => {
      state.notes = action.payload;
    },
    removeLoggedInUser: (state) => {
      state.loggedInUser = null;
      state.notes = [];
    },
    changeUsername: (state, action: PayloadAction<UserType>) => {
      if (!state.loggedInUser) return;

      state.loggedInUser.username = action.payload.username;
    },
  },
});

export const {
  saveProfileInfo,
  setLoggedInUser,
  setUserNotes,
  removeLoggedInUser,
  changeUsername,
} = profileSlice.actions;

export default profileSlice.reducer;
