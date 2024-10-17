import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout = () =>{
  return (
    <>
      <main>
        <div className='container'>
          <Outlet />
        </div>
       
      </main>
    </>
  );
}

export default LoginLayout;