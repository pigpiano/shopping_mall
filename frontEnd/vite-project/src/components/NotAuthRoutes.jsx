// 로그인 된 사람이 로그인페이지나 회원가입 페이지에 들어가려고 할 때 처리하는 페이지
// eslint-disable-next-line no-unused-vars
import React from 'react' 
import { Navigate, Outlet } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const NotAuthRoutes = ( {isAuth} ) => {
  return (
    isAuth? <Navigate to={'/'} /> : <Outlet />
  )
}

export default NotAuthRoutes

