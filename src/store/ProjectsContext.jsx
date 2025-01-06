import React, { createContext, useState, useEffect, useReducer } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

export const ProjectsContext = createContext();

const token = import.meta.env.VITE_TOKEN;

// const FETCH = "FETCH";
import { FETCH, ADD, UPDATE, DELETE } from "./ApiCall";

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH:
      return { projects: action.payload };
    case ADD:
      return { projects: [...state.projects, action.payload] };
    case UPDATE:
      return {
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case DELETE:
      return {
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { projects: [] });
  const { projects } = state;
  const api = new TodoistApi(token);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    api
      .getProjects()
      .then((projects) => {
        dispatch({ type: FETCH, payload: projects });
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  const addProject = async (newProjectData) => {
    return api
      .addProject(newProjectData)
      .then((newProject) => {
        console.log(newProject);
        dispatch({ type: ADD, payload: newProject });
        return newProject;
      })
      .catch((error) => {
        console.error("Error adding project:", error);
        throw error;
      });
  };

  const updateProject = async (projectId, updatedData) => {
    return api
      .updateProject(projectId, updatedData)
      .then((data) => {
        dispatch({ type: UPDATE, payload: data });

        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error updating project:", error);
        throw error;
      });
  };

  const deleteProject = async (projectId) => {
    return api
      .deleteProject(projectId)
      .then((data) => {
        dispatch({ type: DELETE, payload: projectId });
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        throw error;
      });
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
