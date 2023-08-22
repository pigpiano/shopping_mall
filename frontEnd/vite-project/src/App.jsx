
import { Outlet, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Footer from './layout/Footer';
import Navbar from './layout/NavBar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunkFunctions'
import ProtectedPage from './pages/ProtectedPage';
import NotAuthRoutes from './components/NotAuthRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';
import UploadProductPage from './pages/UploadProductPage';
import DtailProductPage from './pages/DtailProductPage';
import HistoryPage from './pages/HistoryPage';
import CartPage from './pages/CartPage';

function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
         />
    <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto h-10 bg-green-500'>

        <Outlet />
      </main>
    <Footer />
    </div>
  )
}
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch])



  return (
    <Routes>
      <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} /> 
        {/* 로그인한 사람만 갈 수 있는 경로 ProtectedPage components에서 <Outlet /> 역할 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path='/Protected' element={<ProtectedPage />} />
          <Route path='product/upload' element={<UploadProductPage/>} />
          <Route path='product/:productId' element={< DtailProductPage/>} />
          <Route path='user/cart' element={< CartPage/>} />
          <Route path='history' element={ < HistoryPage/>} />
        </Route>
        
        {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth}/>}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

      </Route>
    </Routes>
  )
}


export default App
