import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate, Outlet} from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

function AdminRootLayout() {
    const userCtx = useContext(UserContext);

    return userCtx.current_user && userCtx.current_user.role === "admin" ? (
      <div className="flex h-[100%] w-[100%] gap-6">
        <AdminSidebar />
          <Outlet />
      </div>
    ) : (
      <Navigate to="/" />
    );
}

export default AdminRootLayout;
