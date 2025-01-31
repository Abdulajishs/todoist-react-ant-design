import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css";
import ProjectsProvider from "./store/ProjectsContext.jsx";
import TasksProvider from "./store/TasksContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </ProjectsProvider>
  </StrictMode>
);
