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
    console.log('props', this.props.adoptedPets);
    petServices.deletePet(pet);
    // Determines if the adopted pet is a cat or dog
    if (pet === 'cat') {
      let adoptedCat = this.state.cat.name;
      console.log('cat name', this.state.cat.name);
      petServices.getPet('cat')
      .then((cat) => {
        console.log('new cat?',cat.name);
        const tempAdopted = this.state.adoptedPets;
        tempAdopted.push(adoptedCat);
        console.log('tempAdopted', tempAdopted);
        this.setState({cat, adoptedPets: tempAdopted})
      })
      console.log('adopted pets', this.state.adoptedPets);
    } else {
      let adoptedDog = this.state.dog.name;
      petServices.getPet('dog')
      .then((dog) => {
        console.log('new dog?',dog.name);
        const tempAdopted = this.state.adoptedPets;
        tempAdopted.push(adoptedDog);
        console.log('tempAdopted', tempAdopted);
        this.setState({dog, adoptedPets: tempAdopted})
      })
    }
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