/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageSlider = ({ images }) => {
    return (
        // 가운데 사진 들어가는 것을 해줌
        <Carousel autoPlay showThumbs={false} infiniteLoop>
            {images.map(image => (
                <div key={image}>
                    <img
                    //이미지는 항상 백엔드에다 저장하기 때문에 백엔드에서 가져온다. 
                        src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                        alt={image}
                        className='w-full max-h-[150px]'
                    />
                </div>
            ))}
        </Carousel>
    )
}

export default ImageSlider