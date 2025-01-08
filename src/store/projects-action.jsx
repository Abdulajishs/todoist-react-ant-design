import {
  setProject,
  addProject,
  updateProject,
  deleteProject,
} from "./projectSlice";

import { TodoistApi } from "@doist/todoist-api-typescript";
const token = import.meta.env.VITE_TOKEN;
const api = new TodoistApi(token);

export const fetchProjects = () => async (dispatch) => {
  try {
    const projects = await api.getProjects();
    dispatch(setProject(projects));
  } catch (error) {
    console.error("Error to fetch projects:", error);
  }
};

export const addNewProject = (newProjectData) => async (dispatch) => {
  try {
    const data = await api.addProject(newProjectData);
    dispatch(addProject(data));
    return { success: true, data };
  } catch (error) {
    console.error("Error adding project:", error);
    return { success: false, error };
  }
};

export const updateExistingProject =
  (projectId, updatedData) => async (dispatch) => {
    try {
      const data = await api.updateProject(projectId, updatedData);
      dispatch(updateProject(data));
      return { success: true, data };
    } catch (error) {
      console.error("Error updating project:", error);
      return { success: false, error };
    }
  };

export const deleteExistingProject = (projectId) => async (dispatch) => {
  try {
    const data = await api.deleteProject(projectId);
    dispatch(deleteProject(projectId));
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
