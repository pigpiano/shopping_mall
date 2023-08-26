/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/thunkFunctions';

const ProductInfo = ( {product} ) => { // props로 product 데이터를 가져온다

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addToCart({productId: product._id})); // addToCart 썽크 함수를 dispatch 해준다. 그리고 썽크함수에 아래에 해당하는 해당 productId를 넣어주면된다. 
        
        
    }
  return (
    <div>
        <p className='text-xl text-bold'>상품 정보</p>
        <ul>
            <li><span className='font-semibold text-gray-900'>가격: </span>{product.price} 원</li>
            <li><span className='font-semibold text-gray-900'>팔린 개수:</span>{product.sold} 개</li>
            <li><span className='font-semibold text-ray-900'>설명: </span>{product.description}</li>
        </ul>


        {/* onClick event가 발생했을 때 handleClick 함수 호출 */}
        <div className='mt-3'>
            <button className='w-full px-4 py-2 text-white duration-200 transform bg-black rounded-md hover:bg-gray-700'
                    onClick={handleClick}>  
                장바구니로
            </button>
        </div>

    </div>
  )
}

export default ProductInfo
