/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';

// 주문한것들을 보여주는 페이지
const HistoryPage = () => {

  const userData = useSelector(state => state.user?.userData);
  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>History</h2>
      </div>
      {/* text-left -> 정렬해주는 것. */}
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='border-[1px]'>
          <tr>
            <th>Payment Id</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {userData?.history.map(item => ( // 만약 userData가 있고 history가 있다면
            <tr className='border-b' key={item.id}>
              <td>{item.id}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{dayjs(item.dateOfPurchase).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default HistoryPage
