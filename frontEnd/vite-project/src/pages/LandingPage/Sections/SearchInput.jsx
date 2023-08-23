/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

// index.jsx 에서 내려서 여기서 props로 onSearch, searchTerm 을 받았다.
const SearchInput = ( {onSearch, searchTerm }) => {
  return (
    // UI 작성하기
    <input
        className='p-2 border border-gray-300 rounded-md'
        type="text"
        placeholder='검색하세요.'
        onChange={onSearch}
        value={searchTerm}
    />
  )
}

export default SearchInput
