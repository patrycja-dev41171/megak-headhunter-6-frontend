import { createSlice } from '@reduxjs/toolkit';
import { StudentGetAll } from 'types';

interface User {
  id: string;
  accessToken: string;
  expirationTime: number;
  role: string;
  isLoggedIn: boolean;
  studentsList: StudentGetAll[];
}

const initialState: User = {
  id: '',
  accessToken: '',
  expirationTime: 0,
  role: '',
  isLoggedIn: false,
  studentsList: [],
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

interface SetIsLoggedIn {
  payload: boolean;
}

interface SetStudentList {
  payload: StudentGetAll[];
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
    setIsLoggedIn: (state, action: SetIsLoggedIn) => {
      state.isLoggedIn = action.payload;
    },
    setStudentList: (state, action: SetStudentList) => {
      state.studentsList = action.payload;
    },
  },
});

export const {setId, setAccessToken, setExpirationTime, setRole, setIsLoggedIn, setStudentList} = userSlice.actions;