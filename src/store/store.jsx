import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectSlice";
import tasksReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});

export default store;
