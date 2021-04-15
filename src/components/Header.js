import React from "react";

import { Link } from 'react-router-dom'
import MobileNav from './menu/MobileNav'
import NavBarDesktop from './menu/NavBarDesktop'

const leftItems = [
  { as: Link, content: "Mens", key: "mens", to: '/shop' },
  { as: Link, content: "Womens", key: "womens", to: '/shop' },
  { as: Link, content: "Kids", key: "kids", to: '/' }
]

const Header = () => {


  return (
    <>
      <NavBarDesktop leftItems={leftItems} />
      <MobileNav leftItems={leftItems} />
    </>
  );
}

export default Header