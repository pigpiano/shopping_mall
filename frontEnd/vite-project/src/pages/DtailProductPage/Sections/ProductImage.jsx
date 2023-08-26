/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import ImageGallery from 'react-image-gallery';

const ProductImage = ({product}) => { // props로 product 데이터를 가져오고 있음.

    const [images, setImages] = useState([]); // 처음에 이미지는 빈 배열

    // 컴포넌트가 렌더링될 때마다 원하는 작업이 실행되도록 설정할 수 있는 기능.
    useEffect(()=>{
        if(product.images && product.images.length > 0) {
            let images = [] // 객체를 배여일 넣기 우히ㅐ서

            product.images.map(imageName => {
                return images.push({
                    original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
                    thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`
                })
            })

            setImages(images) // 업데이트해줌
        }
    },[product]) // product 바뀔때마다 다시 호출해줌.

  return (
    <ImageGallery items={images} />
  )
}

export default ProductImage
