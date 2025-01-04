import React, { createContext, useState, useEffect, useReducer } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

export const ProjectsContext = createContext();

const token = import.meta.env.VITE_TOKEN;

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return { projects: action.payload };
    case "add":
      return { projects: [...state.projects, action.payload] };
    case "update":
      return {
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case "delete":
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
        dispatch({ type: "fetch", payload: projects });
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
        dispatch({ type: "add", payload: newProject });
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
        dispatch({ type: "update", payload: data });

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
        dispatch({ type: "delete", payload: projectId });
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
