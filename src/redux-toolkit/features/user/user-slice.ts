import { createSlice } from '@reduxjs/toolkit';
import { StudentGetAll, StudentEntityFront } from 'types';

interface User {
  id: string;
  accessToken: string;
  expirationTime: number;
  role: string;
  isLoggedIn: boolean;
  studentsList: StudentGetAll[];
  selectedStudentsList: StudentEntityFront[];
  selectedStudentsContainer: StudentEntityFront[];
}

const initialState: User = {
  id: '',
  accessToken: '',
  expirationTime: 0,
  role: '',
  isLoggedIn: false,
  studentsList: [],
  selectedStudentsList: [],
  selectedStudentsContainer: [],
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

interface SetSelectedStudentList {
  payload: StudentEntityFront[];
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
    SetSelectedStudentList: (state, action: SetSelectedStudentList) => {
      state.selectedStudentsList = action.payload;
      state.selectedStudentsContainer = action.payload;
    },
  },
});

export const { setId, setAccessToken, setExpirationTime, setRole, setIsLoggedIn, setStudentList, SetSelectedStudentList } = userSlice.actions;
