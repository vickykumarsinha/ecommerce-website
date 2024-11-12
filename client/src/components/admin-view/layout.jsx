import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout () {

  const [openSideBar, setOpenSideBar] = useState(false);
    return(
        <div className="flex min-h-screen w-full">

        {/* admin sidebar */}
        <AdminSidebar open={openSideBar} setOpen={setOpenSideBar}/>
        <div className="flex flex-1 flex-col">
          
        {/* admin header */}
        <AdminHeader open={openSideBar} setOpen={setOpenSideBar}/>
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
    );
}
export default AdminLayout;