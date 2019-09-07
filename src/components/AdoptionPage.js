import React from 'react';
// import catServices from '../services/cat-services';
import petServices from '../services/pet-services';
import userService from '../services/users-service';
import './styles/AdoptionPage.css';
import config from '../config';

class AdoptionPage extends React.Component {
  state = {
    dog: null,
    cat: null,
    adoptedPets: [],
    disabled: true,
  }

  //when the component mounts, get the dog and cat queues from server
  
  componentDidMount() {
   petServices.getPet('dog')
    .then((dog) => {
      this.setState({dog})
    })
    petServices.getPet('cat')
      .then((cat) => {
        this.setState({cat})
      });
    this.props.startTimer();
    userService.postUser('YOU!');
  }

  // when user clicks adopt, take pet out of state and tell server to delete
  handleAdopt = (pet) => {
    // Determines if the adopted pet is a cat or dog
    // If it is a cat, removes from state
    if (pet === 'cat') {
      let adoptedCat = this.state.cat;
      // let availableCats = this.state.cat.filter(cat => cat.name !== adoptedCat.name);

      // this.setState({
      //   cats: availableCats,
      //   adoptedPets: [...this.state.adoptedPets, adoptedCat]
      // })

    // Tell the server to delete the pet from queue
    // petServices.deletePet(pet)
    } else {
      let adoptedDog = this.state.dog.name;
      console.log(this.state.dog.name);
      // let availableDogs = this.state.dogs.filter(dog => dog.name !== adoptedDog.name);

      // this.setState({
      //   dogs: availableDogs,
      //   adoptedPets: [...this.state.adoptedPets, adoptedDog]
      // })
      // this is updating the state correctly but need to get it to render in the right hand thing
      this.setState({
        adoptedPets: this.state.adoptedPets.push(adoptedDog)
      });
      console.log(this.state.adoptedPets);

      petServices.deletePet(adoptedDog)
        .then((dog) => {
          
        })
      // Tell the server to delete the pet from queue
      // hmmm how to fix this, don't want to have to do two handle adoption functions
    // petServices.deletePet(pet)
    }
    
  }

  onSubmit = (e) => {
    let petType = e.target.value;
    this.handleAdopt(petType);
  }

  // when user clicks Nevermind, take user out of 
  handleCancel = () => {
    this.props.history.push('/')
    //this.props.clearTimer(timer);
  }

  render() {
    const cat = this.state.cat;
    const dog = this.state.dog;
    return(
      <main>
      {/* Should only come on when "YOU" is first in queue */}
        <h2>It's your turn to adopt!</h2>
        <div className='AdoptionPage-container'>
        <section className='AdoptionPage-pet-section'>
          <h3>Cats</h3>
          {cat ? '' : <h4>No cats to adopt!</h4>}
            {cat ? 
            <section className='AdoptionPage-pet-info'>
            <h4>{cat.name}</h4>
            <section className='AdoptionPage-image-list-container'>        
              <img src={cat.imageURL} alt={cat.imageDescription} />
              <ul>
                <li>Age: {cat.age} </li>
                <li>Gender: {cat.sex}</li>
                <li>Breed: {cat.breed}</li>
              </ul>
            </section>
            <p>Description: {cat.imageDescription}</p>
            <p>Shelter Story: {cat.story}</p>
            <button disabled={this.state.disabled ? 'true' : 'false'} value='cat' onClick={(e) => this.onSubmit(e)}>Adopt Me!</button>
            <button onClick={this.handleCancel}>Nevermind</button>
          </section> 
          : ''}
        </section>
  
        <section className='AdoptionPage-pet-section'>
          <h3>Dogs</h3>
          {dog ? '' : <h4>No dogs to adopt!</h4>}
            {dog ? 
            <section className='AdoptionPage-pet-info'>
            <h4>{dog.name}</h4>
            <section className='AdoptionPage-image-list-container'>        
              <img src={dog.imageURL} alt={dog.imageDescription} />
              <ul>
                <li>Age: {dog.age}</li>
                <li>Gender: {dog.sex}</li>
                <li>Breed: {dog.breed}</li>
              </ul>
            </section>
            <p>Description: {dog.imageDescription}</p>
            <p>Shelter Story: {dog.story}</p>
            <button disabled={this.state.disabled ? 'true' : 'false'} value='dog' onClick={(e) => this.onSubmit(e)}>Adopt Me!</button>
            <button onClick={this.handleCancel}>Nevermind</button>
          </section> 
         : ''}
        </section>
        
      </div>
    </main>
    )
  }
  
}

export default AdoptionPage;