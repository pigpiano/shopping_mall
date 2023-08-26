/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const CheckBox = ({continents, checkedContinents, onFilters }) => {
    const handleToggle = (continentId) => {
        // 현재 누른 checkbox가 이미 누른 checkbox인지 체크
        const currentIndex = checkedContinents.indexOf(continentId)

        const newChecked = [...checkedContinents]
        // 아직 체크가 안되어 있고 없는 거라면
        if (currentIndex === -1 ) {
            newChecked.push(continentId)
        } else { // 이미 들어있는거라면
            // 전체 checked된 State에서 현재 누른 Checked가 이미 있다면
            newChecked.splice(currentIndex, 1) // 지워준다, 체크한거를 한번 더 체크한거니깐
        }
        onFilters(newChecked)
        
    }

  return (
    // p-2 means padding - 2
    <div className='p-2 mb-3 bg-gray-100 rounded-md '>
      {continents?.map(continent => (
        <div key={continent._id}>
            <input
            type="checkbox"
            onChange={()=> handleToggle(continent._id)}
            // check 부분을 좀 더 정확하게 하고 싶으면
            checked={checkedContinents.indexOf(continent._id) === -1 ? false : true } 
            />{" "}             
            <label>{continent.name}</label>
            </div>
      ))}
    </div>
  )
}

export default CheckBox
