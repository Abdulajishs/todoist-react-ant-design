import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      console.log(action.payload);
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      console.log(state, action.payload, action.payload.id);
      state.projects = state.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
  },
});

export const {
  setProject,
  addProject,
  updateProject,
  deleteProject,
  setStatus,
  setError,
} = projectSlice.actions;

export default projectSlice.reducer;
