import React, { createContext, useState, useEffect } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

export const ProjectsContext = createContext();

const token = import.meta.env.VITE_TOKEN;

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const api = new TodoistApi(token);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    api
      .getProjects()
      .then((projects) => {
        setProjects(projects);
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
        setProjects((prev) => [...prev, newProject]);
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
        // console.log(data);
        setProjects((prev) =>
          prev.map((project) => {
            return project.id === projectId ? { ...data } : project;
          })
        );

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
        setProjects((prev) =>
          prev.filter((project) => project.id !== projectId)
        );
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        throw error;
      });
  };

  const refreshProjects = () => setRefresh((prev) => prev + 1);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        refreshProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
