import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProject from "./views/projects/EditProject";
import ViewProjectDetail from "./views/projects/ViewProjectDetail";
import AuthLayout from "./layout/AuthLayout";
import Login from "./views/auth/Login";
import Singup from "./views/auth/Singup";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";

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

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} index />
          <Route path="/auth/singup" element={<Singup />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}