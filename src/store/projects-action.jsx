import {
  setProject,
  addProject,
  updateProject,
  deleteProject,
} from "./projectSlice";

import axios from "axios";

export const fetchProjects = () => async (dispatch) => {
  try {
    const projects = await axios.get("http://localhost:8080/todolist/projects");
    dispatch(setProject(projects.data.slice(0, 10)));
    console.log(projects.data.slice(0, 10));
  } catch (error) {
    console.error("Error to fetch projects:", error);
  }
};

export const addNewProject = (newProjectData) => async (dispatch) => {
  try {
    console.log(newProjectData);
    const response = await axios.post(
      "http://localhost:8080/todolist/projects/",
      newProjectData
    );
    console.log(response);
    let newProject = response.data;
    dispatch(addProject(newProject));
    return { success: true, data: newProject };
  } catch (error) {
    console.error("Error adding project:", error);
    return { success: false, error };
  }
};

export const updateExistingProject =
  (projectId, updatedData) => async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/todolist/projects/${projectId}`,
        updatedData
      );
      console.log(response);
      dispatch(updateProject(updatedData));
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating project:", error);
      return { success: false, error };
    }
  };

export const deleteExistingProject = (projectId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/todolist/projects/${projectId}`
    );
    dispatch(deleteProject(projectId));
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};
