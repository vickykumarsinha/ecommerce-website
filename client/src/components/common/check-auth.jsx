import { Navigate, useLocation } from "react-router-dom";

// checking for Authentication & Redirecting
// user - for user info whether admin/normal user && name email etc
// children - comp that we'll render
function CheckAuth({ isAuthenticated, user, children }) {

    const location = useLocation()  // get user current location

    console.log(location.pathname, isAuthenticated);
    // Not Authenticated and accessing any page redirect to login page
    if (!isAuthenticated && 
        !(
            location.pathname.includes("/login") || 
            location.pathname.includes("/register")
        )
    ) {
        return <Navigate to="/auth/login" />;
    }

    // Authentic & accessing login/register -> home page && admin if user is admin
    if(isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){
        if(user?.role === 'admin'){
            return <Navigate to="/admin/dashboard" />;
        }else{
            return <Navigate to="/shop/home" />;
        }
    }

    // Authentic but accessing ADMIN 
    if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes("admin")){
        return <Navigate to="/unauth-page" />;
    }

    // Auth && admin access shop -> admin page
    if(isAuthenticated && user?.role === 'admin' && location.pathname.includes("shop")){
        return <Navigate to="/admin/dashboard" />;
    }
    

    return (
        <>{children}</>
    );
}

export default CheckAuth;