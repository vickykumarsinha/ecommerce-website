import { Fragment } from "react";
import { Box, ChartNoAxesCombined, ShoppingCart, UserRoundPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSidebarListItems = [
    {
        id: "dashboard",
        label: "Dasboard",
        icon: <ChartNoAxesCombined size={30}/>,
        path: "/admin/dashboard"
    },
    {
        id: "products",
        label: "Products",
        icon: <Box size={30}/>,
        path: "/admin/products"
    },
    {
        id: "orders",
        label: "Orders",
        icon: <ShoppingCart size={30}/>,
        path: "/admin/orders"
    },
]

function MenuItems ({setOpen}) {

    const navigate = useNavigate();

    return <nav className="mt-8 flex-col gap-2">
        {
            AdminSidebarListItems.map(MenuItems => <div 
                className="flex cursor-pointer gap-2 rounded-md px-3 justify-start py-2 text-muted-foreground hover:bg-muted hover:text-foreground text-xl font-bold"
                key={MenuItems.id} 
                onClick={()=> {navigate(MenuItems.path) 
                setOpen ? setOpen(false) : null;
                }}>
                    
                {MenuItems.icon}
                <span >{MenuItems.label}</span>
            </div> )
        }
    </nav>
}

function AdminSidebar({open, setOpen}){

    
    const navigate = useNavigate();
    return(
        <Fragment>
            <Sheet  open={open} onOpenChange={setOpen}>
                <SheetContent side ="left" className=" w-80">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex mt-8 mb-4 gap-2">
                                <UserRoundPen size={40}/>
                                <span className="text-3xl font-extrabold">Admin Panel</span>  
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen = {setOpen}/>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 border-r flex-col bg-background p-6 lg:flex">
                <div onClick={()=> navigate('/admin/dashboard')} className="items-center cursor-pointer flex gap-2">
                    <UserRoundPen size={40}/>
                    <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>

                <MenuItems/>

            </aside>
        </Fragment>
    );
}
export default AdminSidebar;