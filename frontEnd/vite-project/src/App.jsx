
import { Outlet, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './layout/Footer';
import Navbar from './layout/NavBar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>
    <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto h-10 bg-green-500'>

        <Outlet />
      </main>
    <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}


export default App
