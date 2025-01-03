import { TodoistApi } from "@doist/todoist-api-typescript";
import React, { createContext, useEffect, useState } from "react";

export const TasksContext = createContext();

const token = import.meta.env.VITE_TOKEN;
const api = new TodoistApi(token);

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);
  // console.log(tasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    api
      .getTasks()
      .then((tasks) => {
        setTasks(tasks);
        // console.log(tasks);
      })
      .catch((error) => console.log("Error fetching tasks:", error));
  };

  const addTask = async (newTask) => {
    return api
      .addTask(newTask)
      .then((data) => {
        console.log(data);
        setTasks((prev) => [...prev, data]);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  const updateTask = async (taskId, updatedData) => {
    console.log(taskId, updatedData);
    return api
      .updateTask(taskId, updatedData)
      .then((data) => {
        console.log(data);
        setTasks((prev) =>
          prev.map((task) => {
            return task.id === taskId ? data : task;
            // return task.id === taskId ? { ...task, ...updatedData } : task;
          })
        );

        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  const deleteTask = async (taskId) => {
    return api
      .deleteTask(taskId)
      .then((data) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        throw error;
      });
  };

  const closeTask = async (taskId, task) => {
    return api
      .closeTask(taskId)
      .then((data) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        setClosedTasks(() => [...closedTasks, task]);
        console.log("Is added to close Task", data);
        return data;
      })
      .catch((error) => console.log(error));
  };

  const deleteCloseTask = (taskId) => {
    setClosedTasks((prev) => prev.filter((task) => task.id !== taskId));
    return taskId;
  };
  return (
    <TasksContext.Provider
      value={{
        tasks,
        closedTasks,
        addTask,
        updateTask,
        deleteTask,
        closeTask,
        deleteCloseTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
