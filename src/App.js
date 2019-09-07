import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import LandingPage from './components/LandingPage';
import AdoptionPage from './components/AdoptionPage';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import usersService from './services/users-service';
import './App.css';

class App extends React.Component {

  state = {
    timers: false,
    usersQueue: [],
    currentUser: [],
  }

  componentDidMount() {
    usersService.getUsers()
      .then(users => {
        
        this.setState({
          usersQueue: users,
          currentUser: users[0],
        })
      })
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
    usersService.deleteUser();
    this.setState({
      usersQueue: this.state.usersQueue.filter(users => users !== this.state.currentUser),
      currentUser: this.state.usersQueue[0],
      timers: !this.state.timers,
    })
  }

  // NEED TO FIND A PLACE FOR THIS - WHEN LANDING PAGES MOUNTS?
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
        <LeftSidebar usersQueue={this.state.usersQueue}/>
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
