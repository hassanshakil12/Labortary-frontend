import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Archeive from "./pages/Archeive";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import AddAppointments from "./pages/AddAppointments";
import Profile from "./pages/Profile";
import ProfileEmp from "./pages/ProfileEmp";
import Settings from "./pages/Settings";
import SettingsEmp from "./pages/SettingsEmp";
import Logout from "./pages/Logout";
import ArcheiveUser from "./pages/ArcheiveUser";
import UserNotification from "./components/UserNotification";
import LaboratoryNotification from "./components/LaboratoryNotification";
import AdminNotifications from "./components/AdminNotifications";
import MailToAdmin from "./pages/MailToAdmin";
import Appointments from "./pages/Appointments";
import AddEmploye from "./pages/AddEmploye";
import AddLaboratory from "./pages/AddLaboratory";
import Employees from "./pages/Employees";
import Laboratories from "./pages/Laboratories";
import AddPayment from "./pages/AddPayment";
import AppointmentsEmp from "./pages/AppointmentsEmp";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleRedirect from "./components/common/RoleRedirect";
import PublicRoute from "./components/common/PublicRoute";
import LaboratoryDashboard from "./pages/Dashboard/LaboratoryDashboard";
import LaboratoryLayout from "./layout/LaboratoryLayout";
import AppointmentLab from "./pages/AppointmentLab";
import ArcheiveLab from "./pages/ArcheiveLab";
import ProfileLab from "./pages/ProfileLab";
import SettingsLab from "./pages/SettingsLab";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <div className="z-[999999] fixed top-0 left-0 w-full pointer-events-none">
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <ScrollToTop />
      <Routes>
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route index path="/dashboard" element={<AdminDashboard />} />
            <Route path="/add-appointment" element={<AddAppointments />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/add-employee" element={<AddEmploye />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/add-laboratory" element={<AddLaboratory />} />
            <Route path="/laboratories" element={<Laboratories />} />
            <Route path="/add-payment" element={<AddPayment />} />
            <Route path="/archive" element={<Archeive />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<AdminNotifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Protected Employee Routes */}
        <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
          <Route element={<UserLayout />}>
            <Route
              index
              path="/employees-dashboard"
              element={<UserDashboard />}
            />
            <Route path="/appointments-emp" element={<AppointmentsEmp />} />
            <Route path="/mail-to-admin" element={<MailToAdmin />} />
            <Route path="/profile-emp" element={<ProfileEmp />} />
            <Route path="/settings-emp" element={<SettingsEmp />} />
            <Route path="/archeive-emp" element={<ArcheiveUser />} />
            <Route path="/logout-salesperson" element={<Logout />} />
            <Route path="/notification-user" element={<UserNotification />} />
          </Route>
        </Route>

        {/* Protected Laboratory Routes */}
        <Route element={<ProtectedRoute allowedRoles={["laboratory"]} />}>
          <Route element={<LaboratoryLayout />}>
            <Route
              index
              path="/laboratory-dashboard"
              element={<LaboratoryDashboard />}
            />
            <Route
              path="/laboratory-appointments"
              element={<AppointmentLab />}
            />
            <Route path="/laboratory-archeive" element={<ArcheiveLab />} />
            <Route path="/laboratory-settings" element={<SettingsLab />} />
            <Route path="/laboratory-profile" element={<ProfileLab />} />
            <Route
              path="/laboratory-notification"
              element={<LaboratoryNotification />}
            />
            <Route path="/laboratory-logout" element={<Logout />} />
          </Route>
        </Route>

        {/* Public Auth Routes */}
        <Route path="/" element={<RoleRedirect />} />
        <Route path="/signin" element={<PublicRoute element={<SignIn />} />} />
        <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
        <Route path="/logout" element={<Logout />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
