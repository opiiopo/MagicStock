import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/navigation/navigation.jsx';
import { Stockboard } from './components/stockboard/stockboard.jsx';

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <Navigation />
          <main>
            <Routes>
              <Route exact path='/' element={<Stockboard />} />
              <Route exact path='/stockboard' element={<Stockboard />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
  );
}

export default App;
