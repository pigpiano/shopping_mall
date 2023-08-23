// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import axiosInstance from '../../utils/axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';

// eslint-disable-next-line no-unused-vars
const continents = [
    {key: 1, value: 'Africa'},
    {key: 2, value: 'Europe'},
    {key: 3, value: 'Asia'},
    {key: 4, value: 'North America'},
    {key: 5, value: 'South America'},
    {key: 6, value: 'Australia'},
    {key: 7, value: 'Antarctica'},

]

const UploadProductPage = () => {

const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    continents: 1,
    images: []
})

const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      // 업데이트 될 때마다 오버라이드 됨
      [name]: value
    }))
  }

// image 배열을 업데이트해줌
const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages
    }))
  }

const navigate = useNavigate();
const userData = useSelector(state => state.user?.userData)

// eslint-disable-next-line no-unused-vars
const handleSubmit = async (event) => {

        // const body = {
    //     writer: userData.id,
    //     ...product
    //   }

    // 생성버튼 눌렀을 때 페이지 refresh 되는거 방지.
    event.preventDefault();

    // 서버에 보내서 서버에서 DB로 저장한다.
    const { title, description, price, images, continents } = product;
    // 개별 변수로 사용할 수 있게해줌.
    const body = {
        writer: userData.id, // 로그인 된 사람의 Id
        title,
        description,
        price,
        images,
        continents
    }
    

    try {
        await axiosInstance.post('/products', body); // 요청해서 응답이 올 때까지 기다리고
        // navigate 한다.
        navigate('/');
    } catch(error) {
        console.log(error);
    }
}

  return (
    <section>
    <div className='text-center m-7'>
      <h2> 예상 상품 업로드 </h2>
    </div>

    <form className='mt-6' onSubmit={handleSubmit} >

    <FileUpload  images={product.images} onImageChange={handleImages} />

        <div className='mt-4'>
            <label htmlFor='title'>이름</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md'
                    name='title' id='title' onChange={handleChange} value={product.title}/>
        </div>

        <div className='mt-4'>
            <label htmlFor='description'>설명</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md'
                    name='description' id='description' onChange={handleChange} value={product.description}  />
        </div>

        <div className='mt-4'>
            <label htmlFor='price'>가격</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md'
                    type='number' name='price' id='price' onChange={handleChange} value={product.price}  />
        </div>

        <div className='mt-4'>
            <label htmlFor='continents'>지역</label>
            <select className='w-full px-4 mt-2 bg-white border rounded-md'
                    name="continents" id='continents' onChange={handleChange}  value={product.continents} >

            {/* 지역 option 생성하기 */}
            {continents.map(item  => (
                <option key={item.key} value={item.key}>{item.value}</option>
            ))}
                
            </select>
        </div>
        <div className='mt-4 '>
            <button type='submit'
            className='w-full px-4 text-white bg-black rounded-md hover:bg-gray-700 py-3'>
                생성하기
            </button>
        </div>
    </form>

    </section>


    
  )
}

export default UploadProductPage
