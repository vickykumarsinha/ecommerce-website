import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth-layout';
import AuthLogin from './pages/auth-view/login';
import AuthRegister from './pages/auth-view/register';
import AdminDashBoard from './pages/admin-view/dashboard';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import AdminLayout from './components/admin-view/layout';
import ShoppingLayout from './components/shopping-view/layout';
import PageNotFound from './pages/not-found/index.jsx';
import ShopingAccount from './pages/shopping-view/account';
import ShopingList from './pages/shopping-view/listing';
import ShopingCheckout from './pages/shopping-view/checkout';
import ShopingHome from './pages/shopping-view/home';
import CheckAuth from './components/common/check-auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import vks from './../public/vks.png';
import { SearchIcon } from 'lucide-react';

function App() {

  // from client\src\store\store.js
  // where auth is name of reducer
  const{user, isAuthenticated, isLoading} = useSelector(state => state.auth);

  // auth-middleware
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(checkAuth());
  }, [dispatch]);

  console.log(isLoading, user);

  return (
    <div className='flex flex-col overflow-hidden bg-blue-500'>
      <div className='flex items-center gap-4 px-10 py-2'>
      <div className="flex items-center gap-4">
          <img src={vks} className="w-12" alt="Vicky's Logo" />
          <span className="font-extrabold text-2xl">Vicky's Ecommerce</span>
        </div>

        {/* Centered Search Box */}
        <div className="flex-grow flex justify-center">
          <div className="flex items-center bg-white rounded-full px-4 py-1 w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow px-2 py-1 text-black outline-none"
            />
            <SearchIcon className="text-gray-500" />
          </div>
        </div>
    </div>

      <Routes>
        <Route path="/auth" element={   // CheckAuth from common for Auth && Redirecting
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>

          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>

          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        } >
          <Route path="account" element={<ShopingAccount />} />
          <Route path="list" element={<ShopingList />} />
          <Route path="checkout" element={<ShopingCheckout />} />
          <Route path="home" element={<ShopingHome />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </div>
  );
}

export default App;
