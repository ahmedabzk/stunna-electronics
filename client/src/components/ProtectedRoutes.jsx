import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import Modal from "./ModalWrapper";

function ProtectedRoutes() {
    const userCtx = useContext(UserContext);

    return userCtx.current_user ? (
        <Outlet />
    ) : (
        <Modal open={true}>
            <p>You must sign in to continue checking out</p>
            <div>
                <Link to={'/shop'} className="border p-3 bg-slate-200 hover:bg-slate-400">Continue shopping</Link>
                <Link to={'/sign-in'} className="border p-3 bg-slate-700 text-white">Sign in to checkout</Link>
            </div>
        </Modal>
    );
}

export default ProtectedRoutes