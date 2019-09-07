import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import LandingPage from './components/LandingPage';
import AdoptionPage from './components/AdoptionPage';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import './App.css';
import petServices from './services/pet-services';
import AppContext from './AppContext';

class App extends React.Component {
  state = {
    adoptedPets: [],
    dog: [],
    cat: [],
  }

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
      adoptedPets: this.state.adoptedPets,
      handleAdopt: this.handleAdopt
    }
    console.log('rendering app.js');
    return (
      <AppContext.Provider value={contextValue}>
      <div className="App">
      
      <Header />
      <main className="main-container">
        <LeftSidebar />
        <Route exact path='/' component={LandingPage} />
        <AdoptionPage adoptedPets={this.state.adoptedPets} />
        <RightSidebar adoptedPets={this.state.adoptedPets} />
      </main>
      <Footer />
        
      </div>
      </AppContext.Provider>
    );
  }
}

export default App;