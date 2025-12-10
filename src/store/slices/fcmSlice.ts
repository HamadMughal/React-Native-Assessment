import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FcmState {
  token: string | null;
  isPermissionGranted: boolean;
}

const initialState: FcmState = {
  token: null,
  isPermissionGranted: false,
};

const fcmSlice = createSlice({
  name: 'fcm',
  initialState,
  reducers: {
    setFcmToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setPermissionGranted: (state, action: PayloadAction<boolean>) => {
      state.isPermissionGranted = action.payload;
    },
    clearFcmToken: (state) => {
      state.token = null;
    },
  },
});

export const { setFcmToken, setPermissionGranted, clearFcmToken } = fcmSlice.actions;
export default fcmSlice.reducer;