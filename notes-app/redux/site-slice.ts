import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SiteInfo } from '../utils/interfaces';

const initialState: SiteInfo = {
  loading: false,
  message: '',
};

export const siteSlice = createSlice({
  name: 'siteInfo',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setLoading, setMessage } = siteSlice.actions;

export default siteSlice.reducer;
