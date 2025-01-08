import { createSlice } from "@reduxjs/toolkit";

const initialState = { tasks: [], closedTasks: [] };
const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setCloseTask: (state, action) => {
      state.closedTasks.push(action.payload);
    },
    deleteCloseTask: (state, action) => {
      {
        state.closedTasks = state.closedTasks.filter(
          (task) => task.id !== action.payload
        );
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setCloseTask,
  deleteCloseTask,
} = taskSlice.actions;

export default taskSlice.reducer;
