/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react'
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';

// eslint-disable-next-line react/prop-types
const CardItem = ({ product }) => {
  return (
    <div className='border-[1px] border-gray-300'>
        <ImageSlider images={product.images} />
        {/* 제품을 클릭하면 상세페이지로 이동하게 만들어줌 */}
        <Link to={`/product/${product._id}`} >
            <p className='p-1'>{product.title}</p>
            <p className='p-1'>{product.continents}</p>
            <p className='p-1 text-xs text-gray-500'>{product.price}원</p>
        </Link>
    </div>
  )
}

export default CardItem
