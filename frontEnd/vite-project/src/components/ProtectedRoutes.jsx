//로그인 안된 사람이 로그인 된 페이지에 접속하려고 할 때 막는 컴포넌트
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ isAuth }) => {
  return (
    // isAuth가 true면 <Outlet /> 그렇지 않으면 Nvigate
    isAuth ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default ProtectedRoutes
