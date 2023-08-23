/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { useState }from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../utils/axios'
import { continents, prices } from '../../utils/filterData'
import CardItem from './Sections/CardItem'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchInput from './Sections/SearchInput'

const LandingPage = () => {

  // 기본 상품 배열 4
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0); // 처음에는 0 값을 갖는다.
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    price: []
  })

  // 컴포넌트가 마운트 되면 한번만 아래 코드를 실행한다.
  useEffect(() => {
    fetchProducts({ skip, limit }) // 몽고디비에서 해당 정보를 fetchProducts() 통해 가져온다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchProducts = async ({skip, limit, loadMore = false, filters = {}, searchTerm = "" }) => {
    const params = { 
      skip,
      limit,
      filters,
      searchTerm
    }

    try {
      const response = await axiosInstance.get('/products', { params })

      if (loadMore) { // if loadMore is True
        // 원래 있던것 + 새로온 것들 나열
        setProducts([...products, ...response.data.products])
      } else {
        setProducts(response.data.products);
      }
      // hasMore state update
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
      searchTerm: searchTerm
    }
    fetchProducts(body); // 백엔드에서 가져온다
    setSkip(skip + limit); // 기존 + 추가 상품
  }

  const handleFilters = (newFilteredData, category ) => {
    // filters 배열을 복사해준다.
    const newFilters = {...filters};
    newFilters[category] = newFilteredData

    if( category === 'price') {
      const priceValues = handlePrice(newFilteredData);
      newFilters[category] = priceValues
    }

    showFilteredResults(newFilters)
    //filters State를 update
    setFilters(newFilters)
  }

  const handlePrice = (value) => {
    let array = [];
    for( let key in prices ) {
      if(prices[key]._id === parseInt(value, 10)) {
        array = prices[key].array
      }
    }
    return array;
  }

  const showFilteredResults = (filters) => {

    const body ={
      skip: 0, // 필터를 하면 처음부터 가져오는 것이기 때문
      limit,
      filters,
      searchTerm
    }
    // 백엔드에 요청을 보내서가져오기
    fetchProducts(body);
    setSkip(0);

  }

  const handleSearchTerm = (event) => {
    const body = {
      skip: 0,
      limit,
      filters,
      // event.tartget.value = 내가 검색한 것.
      searchTerm: event.target.value
    }

    setSkip(0);
    setSearchTerm(event.target.value)
    fetchProducts(body); // 백엔드에서 가져오는 것.
  }


  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>여행 상품 사이트</h2>
      </div>      
          
      {/* 필터 부분 */}
      <div className='flex gap-3'>
        <div className='w-1/2'>
          <CheckBox continents={continents} checkedContinents={filters.continents}
          onFilters={filters => handleFilters(filters, "continents")} />
        </div>

        <div className='w-1/2'>
        <RadioBox prices={prices} checkedPrice={filters.price}
            onFilters={filters => handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/* 검색 부반 */}
      <div className='flex justify-end mb-3'>
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>

      {/* 카드 부분 */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {products.map( product => 
        <CardItem product={product} key={product._id} /> )}
      </div>


      {/* LoadMore */}
      {/* hasMore이 True일때만 아래 부분을 랜더링하는 걸로 */}
      {hasMore &&
        <div className='flex justify-center mt-5'>
          <button
            onClick={handleLoadMore}
            className='px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500'>       
            더 보기
          </button>
        </div>
      }
      
    </section>
  )
}

export default LandingPage
