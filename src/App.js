import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import LandingPage from './components/LandingPage';
import AdoptionPage from './components/AdoptionPage';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
    
    <Header />
    <main className="main-container">
      <LeftSidebar />
      <Route exact path='/' component={LandingPage} />
      <Route path='/adopt' component={AdoptionPage} />
      <RightSidebar />
    </main>
    <Footer />
      
    </div>
  );
}

export default App;
