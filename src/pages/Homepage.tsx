import React, { useEffect } from 'react';
import '../App.css';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Content } from '../components/Content/Content';

function Homepage() {

  return (
    <div className='container'>
      <Header></Header>
      <div className='content'>
        <Sidebar></Sidebar>
        <Content></Content>
      </div>
    </div>
  );
}

export default Homepage;
