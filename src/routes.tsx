import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProject from "./views/projects/EditProject";
import ViewProjectDetail from "./views/projects/ViewProjectDetail";

export function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/project/create" element={<CreateProjectView />} />
          <Route path="/project/:projectId/edit" element={<EditProject />} />
          <Route path="/project/:projectId" element={<ViewProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}