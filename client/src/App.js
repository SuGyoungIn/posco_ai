import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import AdminHome from './page/AdminHome';
import Login from './page/Login';
import Signup from './page/Signup';
import Park from './page/Park';
import SelectAnimal from './page/Park';
import { SocketManager } from './components/SocketManager';

const App = () => {
  return (
    <div className='App'>
      <SocketManager />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/admin-home' element={<AdminHome />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/park' element={<Park />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
