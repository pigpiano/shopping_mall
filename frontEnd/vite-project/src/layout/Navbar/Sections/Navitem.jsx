// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/thunkFunctions';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const routes = [
  { to: '/login', name: '로그인', auth: false},
  { to: '/register', name: '회원가입', auth: false},
  { to: '/product/upload', name: '업로드', auth: true},
  { to: 'user/cart', name: '카드', auth: true, 
    icon: <AiOutlineShoppingCart style={{ fontSize: '1.4rem' }} /> },

  { to: '', name: '로그아웃', auth: true },
  { to: '/history', name: '주문목록', auth: true },
]

// eslint-disable-next-line react/prop-types
const Navitem = ({ mobile }) => {

  const navigate = useNavigate();
  //Redux 상태를 컴포넌트에서 선택적으로 가져오는 역할, 유저가 있을때만 가져온다는 뜻
  const isAuth = useSelector(state => state.user?.isAuth)
  const cart = useSelector(state => state.user?.userData?.cart);
  //Redux 액션을 디스패치(dispatch)하는 함수를 가져오는 역할
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logoutUser())
        .then(() => {
          navigate("/login") 
        })      
       } catch (error) {
      console.error(error);
    }
  };
  return (
    <ul className={`text-md justify-center w-full flex gap-4 ${mobile && "flex-col bg-gray-900 h-full"} items-center`}>
      {routes.map(({ to, name, auth, icon }) => {
        if(isAuth !==auth) return null;

        if(name === '로그아웃') {
          
          return <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
            <Link onClick={handleLogout}>{name}</Link>
          </li>
        } else if(icon) {
          return <li key={name} className='relative py-2 text-center border-b-4 cursor-pointer'>
            <Link to={to}>{icon}
            <span className='absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold 
            text-white bg-red-500 border-2 border-white rounded-full -right-3'>{cart?.length}
            </span>
          </Link>
        </li>
        }  else {
          // 고유 값으로 key={} 넣어줘야한다. 여기서는 name이 고유하므로 name을 넣는다.
          
          return <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
            <Link to={to}>{name}</Link>
          </li>
        }
      })}
    </ul>

  )
}

export default Navitem
