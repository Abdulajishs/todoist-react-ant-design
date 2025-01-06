import { TodoistApi } from "@doist/todoist-api-typescript";
import React, { createContext, useEffect, useReducer, useState } from "react";

export const TasksContext = createContext();
import { FETCH, ADD, UPDATE, DELETE, ADD_CLOSE, DELETE_CLOSE } from "./ApiCall";

const token = import.meta.env.VITE_TOKEN;
const api = new TodoistApi(token);

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH:
      return { ...state, tasks: action.payload };
    case ADD:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "addClose":
      console.log(state.closedTasks, action.payload);
      return { ...state, closedTasks: [...state.closedTasks, action.payload] };
    case "deleteClose":
      return {
        ...state,
        closedTasks: state.closedTasks.filter(
          (task) => task.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { tasks: [], closedTasks: [] });
  const { tasks, closedTasks } = state;
  // const [closedTasks, setClosedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    api
      .getTasks()
      .then((tasks) => {
        dispatch({ type: FETCH, payload: tasks });
      })
      .catch((error) => console.log("Error fetching tasks:", error));
  };

  const addTask = async (newTask) => {
    return api
      .addTask(newTask)
      .then((data) => {
        dispatch({ type: ADD, payload: data });
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
      .then((task) => {
        console.log(task);

        dispatch({ type: UPDATE, payload: task });
        return task;
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
        dispatch({ type: DELETE, payload: taskId });
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
        // setTasks((prev) => prev.filter((task) => task.id !== taskId));
        dispatch({ type: DELETE, payload: taskId });
        // setClosedTasks(() => [...closedTasks, task]);
        dispatch({ type: ADD_CLOSE, payload: task });
        console.log("Is added to close Task", data);
        return data;
      })
      .catch((error) => console.log(error));
  };

  const deleteCloseTask = (taskId) => {
    // setClosedTasks((prev) => prev.filter((task) => task.id !== taskId));
    dispatch({ type: DELETE_CLOSE, payload: taskId });
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
