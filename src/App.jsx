import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SingleProjectContent from "./components/Content/SingleProjectContent";
import MyProjectsPage from "./pages/MyProjectsPage";

function App() {
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
