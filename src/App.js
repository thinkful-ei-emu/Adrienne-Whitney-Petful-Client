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
    let timer = setInterval(this.handleDelete, 15000);
  }

  handleDelete = () => {
    console.log('DELETING FIRST IN QUEUE');
    userService.deleteUser();
    this.handleTimer();
    this.setState({
      timers: !this.state.timers,
    })
  }

  // clearTimer = (timer) => {
  //   clearInterval(timer);
  //   this.setState({
  //     timers: false,
  //   })
  // }

  render() {
    return (
      <div className="App">
      
      <Header />
      <main className="main-container">
        <LeftSidebar />
        <Route exact path='/' component={LandingPage} />
        <Route path='/adopt' render={({history}) => (
          <AdoptionPage
            history={history}
            startTimer={this.startTimer}
            //clearTimer={this.clearTimer}
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
