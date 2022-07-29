import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  accessToken: string;
  expirationTime: number;
  role: string;
}

const initialState: User = {
  id: '',
  accessToken: '',
  expirationTime: 0,
  role: '',
};

interface SetId {
  payload: string;
}

interface SetAccessToken {
  payload: string;
}

interface SetExpirationTime {
  payload: number;
}

interface SetRole {
  payload: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: SetId) => {
      state.id = action.payload;
    },
    setAccessToken: (state, action: SetAccessToken) => {
      state.accessToken = action.payload;
    },
    setExpirationTime: (state, action: SetExpirationTime) => {
      state.expirationTime = action.payload;
    },
    setRole: (state, action: SetRole) => {
      state.role = action.payload;
    },
  },
});

export const {setId, setAccessToken, setExpirationTime, setRole} = userSlice.actions;