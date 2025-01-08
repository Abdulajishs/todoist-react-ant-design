import {
  addTask,
  setCloseTask,
  deleteTask,
  setTasks,
  updateTask,
} from "./taskSlice";

import { TodoistApi } from "@doist/todoist-api-typescript";
const token = import.meta.env.VITE_TOKEN;
const api = new TodoistApi(token);

export const fetchTasks = () => async (dispatch) => {
  try {
    const tasks = await api.getTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    console.error("Error to fetch tasks:", error);
  }
};

export const addNewTask = (newTaskData) => async (dispatch) => {
  try {
    const data = await api.addTask(newTaskData);
    dispatch(addTask(data));
    return { success: true, data };
  } catch (error) {
    console.error("Error adding project:", error);
    return { success: false, error };
  }
};

export const updateExistingTask = (taskId, taskData) => async (dispatch) => {
  try {
    const data = await api.updateTask(taskId, taskData);
    dispatch(updateTask(data));
    return { success: true, data };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error };
  }
};

export const deleteExistingTask = (taskId) => async (dispatch) => {
  try {
    const data = await api.deleteTask(taskId);
    dispatch(deleteTask(taskId));
    return { success: true, data };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error };
  }
};

export const addClosedTask = (taskId, newTaskData) => async (dispatch) => {
  try {
    console.log(newTaskData);
    const data = await api.closeTask(taskId);
    dispatch(setCloseTask(newTaskData));
    dispatch(deleteTask(taskId));
    return { success: true, data };
  } catch (error) {
    console.error("Error adding project:", error);
    return { success: false, error };
  }
};
