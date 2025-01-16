import { addTask, deleteTask, setTasks, updateTask } from "./taskSlice";

import { TodoistApi } from "@doist/todoist-api-typescript";
const token = import.meta.env.VITE_TOKEN;
const api = new TodoistApi(token);
import axios from "axios";

export const fetchTasks = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/todolist/tasks/project/${projectId}`
    );
    const tasks = await response.data;
    console.log(tasks);
    dispatch(setTasks(tasks));
  } catch (error) {
    console.error("Error to fetch tasks:", error);
  }
};

export const addNewTask = (newTaskData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/todolist/tasks`,
      newTaskData
    );
    const data = response.data;
    dispatch(addTask(data));
    return { success: true, data };
  } catch (error) {
    console.error("Error adding project:", error);
    return { success: false, error };
  }
};

export const updateExistingTask = (taskId, taskData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/todolist/tasks/${taskId}`,
      taskData
    );
    const data = response.data;
    dispatch(updateTask(data));
    return { success: true, data };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error };
  }
};

export const deleteExistingTask = (taskId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/todolist/tasks/${taskId}`
    );
    const data = response.data;
    dispatch(deleteTask(taskId));
    return { success: true, data };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error };
  }
};
