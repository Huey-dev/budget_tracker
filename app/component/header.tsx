import React from 'react'
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
const Header = () => {
  return (
    <header>
      <nav className='flex'>
        {/* App logo */}
        <a href="">
          <span className=''>Logo</span>
        </a>
        <div className='User-welcome'>
          <h3>
            Welcome, User
          </h3>
          <h3>User</h3>
        </div>

        {/* User Image */}
        <a href="">
          <Image
            src="/avatar-img.png"
            alt='User avatar image'
            width={50}
            height={50}
          />
        </a>
        <GiHamburgerMenu />
      </nav>

    </header>
  )
}

export default Header