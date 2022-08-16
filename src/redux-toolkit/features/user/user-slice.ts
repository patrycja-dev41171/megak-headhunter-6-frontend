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
  studentsContainer: StudentGetAll[];
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
  studentsContainer: [],
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

interface FilteredUsers {
  payload: string;
}

interface FilteredSelectedUsers {
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
    setIsLoggedIn: (state, action: SetIsLoggedIn) => {
      state.isLoggedIn = action.payload;
    },
    setStudentList: (state, action: SetStudentList) => {
      state.studentsList = action.payload;
      state.studentsContainer = action.payload;
    },
    filteredUsers: (state, action: FilteredUsers) => {
      state.studentsList = state.studentsContainer.filter(student => student.firstName.toLowerCase().includes(action.payload));
    },
    setSelectedStudentList: (state, action: SetSelectedStudentList) => {
      state.selectedStudentsList = action.payload;
      state.selectedStudentsContainer = action.payload;
    },
    filteredSelectedUsers: (state, action: FilteredSelectedUsers) => {
      state.selectedStudentsList = state.selectedStudentsContainer.filter(student => {
        const name = `${student.firstName}${student.lastName}`;
        return name.toLowerCase().includes(action.payload);
      });
    },
  },
});

export const {
  setId,
  setAccessToken,
  setExpirationTime,
  setRole,
  setIsLoggedIn,
  setStudentList,
  setSelectedStudentList,
  filteredUsers,
  filteredSelectedUsers,
} = userSlice.actions;
