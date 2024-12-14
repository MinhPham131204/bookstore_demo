import React from 'react';
import './header.css';
import header1 from './header1.png';
import header2 from './header2.png';

const Header = () => {
    return (
      <header>
        <div className='wrapperhead'>
            <img src={header1} alt="Company Logo" className="logo" />
            <img src={header2} alt="Company Logo" className="logo"/>
            <div className='slogan'>
                <p>Nơi tri thức hội tụ - Tương lai sáng ngời</p>
            </div>
        </div>
      </header>
    );
  }
  
  export default Header;