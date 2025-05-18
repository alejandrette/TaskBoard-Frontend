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
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPassword from "./views/auth/ResetPassword";
import PorjectTeam from "./views/projects/PorjectTeam";
import ProfileLayout from "./layout/ProfileLayout";
import ProfileView from "./components/profile/ProfileView";
import ChangePasswordView from "./components/profile/ChangePasswordView";

export function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/project/create" element={<CreateProjectView />} />
          <Route path="/project/:projectId/edit" element={<EditProject />} />
          <Route path="/project/:projectId" element={<ViewProjectDetail />} />
          <Route path="/project/:projectId/team" element={<PorjectTeam />} />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>

        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} index />
          <Route path="/auth/singup" element={<Singup />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}