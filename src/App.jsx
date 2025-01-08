import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SingleProjectContent from "./components/Content/SingleProjectContent";
import MyProjectsPage from "./pages/MyProjectsPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProjects } from "./store/projects-action";
import { fetchTasks } from "./store/tasks-action";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/app/projects" element={<MainLayout />}>
        <Route index element={<MyProjectsPage />} />
        <Route path=":id" element={<SingleProjectContent />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
