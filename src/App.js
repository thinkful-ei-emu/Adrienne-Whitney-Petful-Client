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


  handleDelete = () => {
    console.log('DELETING FIRST IN QUEUE');
    usersService.deleteUser();
    this.setState({
      usersQueue: this.state.usersQueue.filter(users => users !== this.state.currentUser),
      currentUser: this.state.usersQueue[0],
    })
  }
  
    // // when user clicks adopt, take pet out of state and tell server to delete
    // handleAdopt = (pet) => {
    //   // Determines if the adopted pet is a cat or dog
    //   // If it is a cat, removes from state
    //   if (pet === 'cat') {
    //     let adoptedCat = this.state.cat;
  
    //   } else {
    //     let adoptedDog = this.state.dog.name;
    //     console.log(this.state.dog.name);
        
    //     this.setState({
    //       adoptedPets: this.state.adoptedPets.push(adoptedDog)
    //     });
    //     console.log(this.state.adoptedPets);
  
    //     petServices.deletePet(pet)
    //       .then((dog) => {
            
    //       })
    //   }
      
    // }

  handleAdopt = (pet) => {
    if (pet === 'cat') {
      petServices.getPet('cat')
      .then((cat) => {
        const originalCat = cat.first.value.name;
        this.setState({adoptedPets: [...this.state.adoptedPets, originalCat]})
      })
    } else {
      petServices.getPet('dog')
      .then((dog) => {
        const originalDog = dog.first.value.name;
        this.setState({adoptedPets: [...this.state.adoptedPets, originalDog]})
      })
    }

    petServices.deletePet(pet)
      .then(() => {
    // Determines if the adopted pet is a cat or dog
        if (pet === 'cat') {
          petServices.getPet('cat')
          .then((cat) => {
            const newCat = cat.first.value;
            this.setState({cat: newCat})
          })
          console.log('adopted pets', this.state.adoptedPets);
        } else {
          petServices.getPet('dog')
          .then((dog) => {
            const newDog = dog.first.value;
            this.setState({dog: newDog})
          })
        }
      })
    console.log('adopted', this.props.adoptedPets);
  }

  render() {
    const contextValue = {
      dog: this.state.dog,
      cat: this.state.cat,
      adoptedPets: this.state.adoptedPets,
      handleAdopt: this.handleAdopt
    }
    console.log('rendering app.js');
    return (
      <AppContext.Provider value={contextValue}>
      <div className="App">
      
      <Header />
      <main className="main-container">
        <LeftSidebar usersQueue={this.state.usersQueue} />
        <Route exact path='/' component={LandingPage} />
        <Route path='/adopt' render={({history}) => (
          <AdoptionPage
            history={history}
            currentUser={this.state.currentUser}
            handleDelete={this.handleDelete}
            adoptedPets={this.state.adoptedPets}
            cat={this.state.cat}
            dog={this.state.dog}
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