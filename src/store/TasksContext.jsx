import { TodoistApi } from "@doist/todoist-api-typescript";
import React, { createContext, useContext, useEffect, useState } from "react";

export const TasksContext = createContext();

const token = import.meta.env.VITE_TOKEN;

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const api = new TodoistApi(token);
    api
      .getTasks()
      .then((tasks) => {
        setTasks(tasks);
        // console.log(tasks);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <TasksContext.Provider value={{ tasks }}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
