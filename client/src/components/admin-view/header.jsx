import { Menu } from "lucide-react";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader({setOpen}) {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button onClick={()=> setOpen(true)} className="lg:hidden sm:block bg-background border-none text-black hover:bg-slate-400 hover:border-none">
                <Menu />

                <span className="sr-only">Toogle Menu</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="bg-red-500 inline-flex gap-2 items-center px-4 py-2 shadow">
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader;