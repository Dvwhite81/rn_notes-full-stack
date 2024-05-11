import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, UserType } from '../utils/interfaces';

const initialState: Profile = {
  loggedInUser: null,
  notes: [],
  message: '',
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
    setLoggedInUser: (state, action: PayloadAction<Profile>) => {
      state.loggedInUser = action.payload.loggedInUser;
      state.notes = action.payload.notes;
    },
    removeLoggedInUser: (state) => {
      state.loggedInUser = null;
      state.notes = [];
    },
    changeUsername: (state, action: PayloadAction<UserType>) => {
      if (!state.loggedInUser) return;

      state.loggedInUser.username = action.payload.username;
    },
    changeMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const {
  saveProfileInfo,
  setLoggedInUser,
  removeLoggedInUser,
  changeUsername,
  changeMessage,
} = profileSlice.actions;

export default profileSlice.reducer;
