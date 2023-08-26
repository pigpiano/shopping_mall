/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const CartTable = ({products, onRemoveItem }) => { // index.jsx에서 만든 즉, <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem} />을 props로 받는다.
    
    const renderCartImage = (images) => {
        if(images.length > 0 ) {
            let image = images[0]
            return `${import.meta.env.VITE_SERVER_URL}/${image}`
        }

    };
    const renderItems = (
        products.length > 0 && products.map(product => (
            // 키 값을 넣지 않으면 에러 발생
            <tr key={product._id}> 
                <td>
                    <img
                        className='w-[70px]'
                        alt='product'
                        src={renderCartImage(product.images)}
                    />
                </td>

                <td>
                    {product.quantity} 개
                </td>

                <td>
                    {product.price} 원
                </td>

                <td>
                    <button onClick={() => onRemoveItem(product._id)}>
                        지우기
                    </button>
                </td>
            </tr>
        ))
    );
  return (
    <table className='w-full text-sm text-left text-gray-500'>
        <thead className='bolder-[1px]'>
            <tr>
                <th>사진</th>
                <th>개수</th>
                <th>가격</th>
                <th>삭제</th>
            </tr>
        </thead>

        <tbody>
            {renderItems}
        </tbody>
    </table>
  )
}

export default CartTable
