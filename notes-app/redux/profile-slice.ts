import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../interfaces';

const initialState: Profile = {
  username: 'User',
};

export const profileSlice = createSlice({
  name: 'profileInfo',
  initialState,
  reducers: {
    saveProfileInfo: (state, action: PayloadAction<Profile>) => {
      const { username, email, firstName, lastName } = action.payload;
      state.username = username;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
    },
  },
});

export const { saveProfileInfo } = profileSlice.actions;

export default profileSlice.reducer;
