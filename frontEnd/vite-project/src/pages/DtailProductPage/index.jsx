/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';


const DtailProductPage = () => {

  const { productId } = useParams(); 
  const [ product, setProduct ] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(`/products/${productId}?type=single`); // 백엔드에 요청보내기 -> 백엔드 라우트 만들기
        console.log(response) // backend에서 어떤식으로 보내주는지 확인해보기
        setProduct(response.data[0])
      } catch(error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [productId]) // 위 fetchProduct() 함수는 productId가 바뀔 때마다 호출한다.

  if (!product) return null;


  return (
    <section>
      <div className='text-center'>
        <h1 className='p-4 text-2xl'>{product.title}</h1>
      </div>


      <div className='flex gap-4'>
        <div className='w-1/2'>
        {/* ProductImage */}
        <ProductImage product={product} />
        </div>


        <div className='w-1/2'>
        {/* ProductInfo */}
        <ProductInfo product={product} />
        </div>


      </div>
    </section>
  )
}

export default DtailProductPage
