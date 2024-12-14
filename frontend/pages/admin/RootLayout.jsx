import Sidebar from "./AdminSideBar.jsx";
import Header from "./AdminHeader.jsx";

import { Outlet } from "react-router";
export default function AdminDashBoard() {
  
  return (
    <>
    <div className="flex h-full bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-12">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );

};