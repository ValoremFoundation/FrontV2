import React from 'react';
import Header from '../components/header';
import { Outlet } from "react-router-dom";

const HomeLayoutOne = () => {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
export default HomeLayoutOne