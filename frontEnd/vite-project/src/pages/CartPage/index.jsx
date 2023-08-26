/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, payProducts, removeCartItem } from '../../store/thunkFunctions';
import CartTable from './Sections/CartTable';


// 장바구니 페이지
const CartPage = () => {

  const userData = useSelector(state => state.user?.userData); // state.user가 있으면, userData를 userData에 넣는다.
  const cartDetail = useSelector(state => state.user?.cartDetail);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0); // 처음에 total = 0;

  useEffect(()=> {
    let cartItemIds = [] // cart에 들어있는 id들을 넣는 빈배열 생성

    if( userData.cart.length > 0  && userData.cart ) { // same if( userData?.cart && userData.cart.length > 0 )
        userData.cart.forEach(item => {
          cartItemIds.push(item.id);
        })

        const body = { // body 객체 생성
          cartItemIds,
          userCart: userData.cart // userCart property로 userData.cart
        }

        dispatch(getCartItems(body)) // getCartItems()함수를 통해 가져온다.
    }
  }, [dispatch, userData]) // dispatch와 userData를 디펜던시로 넣어준다.

  useEffect(()=>{
    calculateTotal(cartDetail);
  },[cartDetail]) // cartDetail 이 바뀔때 마다 다시 호출한다.

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map(item => total += item.price * item.quantity)
    setTotal(total);
  }
  

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId)) // removeCartItem 썽크 함수 호출

  }

  const handlePaymentClick = () => {
    dispatch(payProducts({ cartDetail })); // cartDetail 이 씽크함수의 body로 들어간다.
  }


  return (
    <section>
      <div className='text-center m-7 '>
        <h2 className='text-2xl'>나의 장바구니</h2>
      </div>

      {cartDetail?.length > 0 ?
        <>
        <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem} />
        <div className='mt-10'>
          <p><span className='font-bold'>합계:</span>{total}원</p>

          <button 
          onClick={handlePaymentClick}
          className='px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500'>
            결제하기
          </button>

        </div>
        
        
        </>
        :
        <p>장바구니가 비었습니다.</p>
    }
    </section>
  )
}

export default CartPage
