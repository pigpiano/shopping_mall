// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navitem from './Sections/NavItem';


const Navbar = () => {

  const [menu, setMenu] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleMenu = () => {
    // false면 true, true면 false, 토큰
    setMenu(!menu)
  }

  return (
    // z-10은 relative를 위해서 주는 것  
    <section className='relative z-10 text-white bg-gray-900'>
      <div className='w-full'>
        {/* mx = margin left, right sm보다 크면 mx-10준다는 의미 */}
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
          {/* logo */}
          <div className='flex items-center text-2xl h-14'>
            <Link to='/'>Logo</Link>
          </div>

          {/* menu */}
          <div className='text-2xl sm:hidden'>
            <button onClick={handleMenu}>{menu ? '-' : '+'}</button>
          </div>

          {/* nav-items large screen 즉, small 보다 큰 사이즈 일 때 display:block처리*/}
          <div className='hidden sm:block'>
            <Navitem />
          </div>

        </div>
        {/* nav-items mobile 즉, small보다 작은 사이즈 일 때 display:hidden */}
        <div className='block sm:hidden'>
          {/* menu가 true일때만 보여주는 것 */}
          {menu && <Navitem mobile />}
        </div>

      </div>

    </section>
  )
}

export default Navbar

