import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/navigation/navigation.jsx';
import { Stockboard } from './components/stockboard/stockboard.jsx';
import { SearchBar } from './components/search_bar/search_bar.jsx';

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <Navigation />
          <main>
            <Routes>
              <Route exact path='/monitor' element={<Stockboard />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
  );
}

export default App;
