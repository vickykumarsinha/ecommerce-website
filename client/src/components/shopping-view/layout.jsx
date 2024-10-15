import { Outlet } from "react-router-dom";
import ShoppingHeader from "./shopping-header";

function ShoppingLayout() {
  return (
    <div className="flex min-h-screen bg-slate-500 overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-1 flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;