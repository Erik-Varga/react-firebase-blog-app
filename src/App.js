import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Article from './components/Article';

function App() {
  return (
    <div className='App'>
      <Header />
      <Navbar />
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/article/:id' element={<Article />} />
        </Routes>
      
      <Footer />
    </div>
  );
}

export default App;