import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";

import { useMutation } from "@tanstack/react-query";

import { fetchLogOut } from "../../utils/http";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const { collapseSidebar } = useProSidebar();
     const userCtx = useContext(UserContext);
     const navigate = useNavigate();

     const { mutate } = useMutation({
       mutationFn: fetchLogOut,
       mutationKey: ["user"],
       onSuccess: () => {
         userCtx.logout();
       },
     });

     const handleLogout = () => {
       mutate();
       navigate("/sign-in");
     };
  
  return (
    <div className="">
      <Sidebar>
        <Menu>
          <MenuItem
            icon={
              <MenuRoundedIcon
                onClick={() => {
                  collapseSidebar();
                }}
              />
            }
          >
            <h1>Admin</h1>
          </MenuItem>
          <MenuItem
            icon={<GridViewRoundedIcon />}
            component={<Link to="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu
            label="Products"
            icon={<InventoryIcon />}
            component={<Link to="/admin/products" />}
          >
            <MenuItem
              icon={<AddCircleRoundedIcon />}
              component={<Link to="/admin/products/create-product" />}
            >
              Create Product
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<ShoppingCartRoundedIcon />} component={<Link to="/admin/orders"/>}>Orders</MenuItem>
          <MenuItem icon={<ReceiptRoundedIcon />}>Sales</MenuItem>
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            component={<Link to="/admin/customers" />}
          >
            Customers
          </MenuItem>
          <SubMenu label="Charts" icon={<BarChartRoundedIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> Timeline Chart </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
          </SubMenu>
          <MenuItem icon={<AccountCircleRoundedIcon />} component={<Link to="/account"/>}>Account</MenuItem>
          <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default AdminSidebar;
