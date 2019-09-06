import React from 'react';
//import petService from '../services/pet-services';
import './styles/AdoptionPage.css';

class AdoptionPage extends React.Component {
  state = {
    dogs: [{
      imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
      imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
      name: 'Fluffy',
      sex: 'Female',
      age: 2,
      breed: 'Bengal',
      story: 'Thrown on the street'
    }],
    cats: [{
      imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
      imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
      name: 'Fluffy',
      sex: 'Female',
      age: 2,
      breed: 'Bengal',
      story: 'Thrown on the street'
    },
    {
      imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
      imageDescription: 'TEST',
      name: 'NEW NAME TESTING',
      sex: 'TEST',
      age: 100,
      breed: 'TEST',
      story: 'TEST'
    }],
    adoptedPets: []
  }

  //when the component mounts, get the dog and cat queues from server
  componentDidMount() {
    // get dog queue
    // const dogs = petServices.getPet('dog');
    // const cats = petServices.getPet('cat');

    // this.setState({
    //   dogs: dogs,
    //   cats: cats,
    // })

    this.props.startTimer();
  }

  // when user clicks adopt, take pet out of state and tell server to delete
  handleAdopt = (pet) => {
    // Determines if the adopted pet is a cat or dog
    // If it is a cat, removes from state
    if (pet === 'cat') {
      let adoptedCat = this.state.cats[0];
      let availableCats = this.state.cats.filter(cat => cat.name !== adoptedCat.name);

      this.setState({
        cats: availableCats,
        adoptedPets: [...this.state.adoptedPets, adoptedCat]
      })

    // Tell the server to delete the pet from queue
    // petService.deletePet(pet)
    } else {
      let adoptedDog = this.state.dogs[0];
      let availableDogs = this.state.dogs.filter(dog => dog.name !== adoptedDog.name);

      this.setState({
        dogs: availableDogs,
        adoptedPets: [...this.state.adoptedPets, adoptedDog]
      })

      // Tell the server to delete the pet from queue
    // petService.deletePet(pet)
    }
    
  }

  onSubmit = (e) => {
    let petType = e.target.value;
    this.handleAdopt(petType);
  }

  // when user clicks Nevermind, take user out of 
  handleCancel = () => {
    this.props.history.push('/');
  }

  render() {
    const cat = this.state.cats[0];
    const dog = this.state.dogs[0];
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
            <button value='cat' onClick={(e) => this.onSubmit(e)}>Adopt Me!</button>
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
            <button value='dog' onClick={(e) => this.onSubmit(e)}>Adopt Me!</button>
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