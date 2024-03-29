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
import petServices from './services/pet-services';
import AppContext from './AppContext';

class App extends React.Component {

  state = {
    adoptedPets: [],
    dog: [],
    cat: [],
    timer: [],
    usersQueue: [],
    currentUser: [],
    adoption: false,
  }

  componentDidMount() {
    usersService.getUsers()
      .then(users => {
        
        this.setState({
          usersQueue: users,
          currentUser: users[0],
        })
      })
      petServices.getPet('dog')
       .then((dog) => {
         const currDog = dog.first ? dog.first.value : [];
         this.setState({dog: currDog})
       })
       
       petServices.getPet('cat')
         .then((cat) => {
           const currCat = cat.first ? cat.first.value : [];
           this.setState({cat: currCat})
         });
  }

  addUser = () => {
    if(this.state.usersQueue[this.state.usersQueue.length-1] === 'YOU!') {
      return this.state.usersQueue;
    }
    this.setState({
      usersQueue: [...this.state.usersQueue, 'YOU!']
    })
  }

  handleDelete = () => {
    usersService.deleteUser();
    this.setState({
      usersQueue: this.state.usersQueue.filter(users => users !== this.state.currentUser),
      currentUser: this.state.usersQueue[1],
    })
  }

  handleTimerStart = () => {
    this.setState({
      adoption: true,
    })
  }

  handleAdoptCat = () => {
    petServices.getPet('cat')
    .then((cat) => {
      const originalCat = cat.first.value.name;
      this.setState({adoptedPets: [...this.state.adoptedPets, originalCat]})
    })
    petServices.deletePet('cat')
      .then(() => {
    petServices.getPet('cat')
          .then((cat) => {
            const newCat = cat.first ? cat.first.value : [];
            this.setState({cat: newCat})
          })
        })
  }

  handleAdoptDog = () => {
    petServices.getPet('dog')
    .then((dog) => {
      const originalDog = dog.first.value.name;
      this.setState({adoptedPets: [...this.state.adoptedPets, originalDog]})
    })

    petServices.deletePet('dog')
      .then(() => {
        petServices.getPet('dog')
          .then((dog) => {
            const newDog = dog.first ? dog.first.value : [];
            this.setState({dog: newDog})
      })
  })
}

  

  render() {
    const contextValue = {
      dog: this.state.dog,
      cat: this.state.cat,
      adoptedPets: this.state.adoptedPets,
      handleAdoptCat: this.handleAdoptCat,
      handleAdoptDog: this.handleAdoptDog,
      usersQueue: this.state.usersQueue
    }
    return (
      <AppContext.Provider value={contextValue}>
      <div className="App">
      
      <Header />
      <main className="main-container">
        <LeftSidebar 
          usersQueue={this.state.usersQueue} 
          adoption={this.state.adoption}/>
        <Route exact path='/' component={LandingPage} />
        <Route path='/adopt' render={({history}) => (
          <AdoptionPage
            history={history}
            currentUser={this.state.currentUser}
            handleDelete={this.handleDelete}
            adoptedPets={this.state.adoptedPets}
            cat={this.state.cat}
            dog={this.state.dog}
            addUser={this.addUser}
            handleAdoptCat={this.handleAdoptCat}
            handleAdoptDog={this.handleAdoptDog}
            usersQueue={this.state.usersQueue}
            handleTimerStart={this.handleTimerStart}
            />
          )} 
        />
        <RightSidebar adoptedPets={this.state.adoptedPets} />
      </main>
      <Footer />
        
      </div>
      </AppContext.Provider>
    );
  }
  
}

export default App;