import React, { createContext, useContext, useState, useEffect } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

export const ProjectsContext = createContext();

const token = import.meta.env.VITE_TOKEN;

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const api = new TodoistApi(token);
    api
      .getProjects()
      .then((projects) => {
        setProjects(projects);
      })
      .catch((error) => console.error(error));
  }, [refreshKey]);

  const refreshProjects = () => setRefreshKey((prev) => prev + 1);

  return (
    <ProjectsContext.Provider value={{ projects, refreshProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
