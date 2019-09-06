import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import LandingPage from './components/LandingPage';
import AdoptionPage from './components/AdoptionPage';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import userService from './services/users-service';
import './App.css';

class App extends React.Component {

  state = {
    timers: false,
  }

  startTimer = () => {
    this.handleTimer();
    this.setState({
      timers: true,
    })
  }

  handleTimer = () => {
    console.log('STARTED A TIMER');
    setTimeout(this.handleDelete, 15000);
  }

  handleDelete = () => {
    userService.deleteUser();
    this.handleTimer();
  }

  componentWillUnmount() {
    clearTimeout();
  }

  render() {
    return (
      <div className="App">
      
      <Header />
      <main className="main-container">
        <LeftSidebar />
        <Route exact path='/' component={LandingPage} />
        <Route path='/adopt' render={() => (
          <AdoptionPage
            startTimer={this.startTimer}
            />
          )} 
        />
        <RightSidebar />
      </main>
      <Footer />
        
      </div>
    );
  }
  
}

export default App;
