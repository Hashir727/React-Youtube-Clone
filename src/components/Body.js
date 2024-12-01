import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import { useSelector } from "react-redux";

function Body() {
  const isMenuOpen = useSelector((store) => store.toggle.isSideBarOpen);

  return (
    <div>
      <Header />
      <div className='flex'>
      <div className='sticky top-0'>
        {isMenuOpen && <SideBar />}
      </div>
      <Outlet />
    </div>
    </div>
  );
}

export default Body;
