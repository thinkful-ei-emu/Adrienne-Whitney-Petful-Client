import React from 'react';
import petServices from '../services/pet-services';
import userService from '../services/users-service';
import './styles/AdoptionPage.css';

class AdoptionPage extends React.Component {
  state = {
    dog: null,
    cat: null,
    adoptedPets: [],
    timer: null,
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
    this.startTimer();
    userService.postUser('YOU!');
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  startTimer() {
    console.log('STARTED A TIMER');
    console.log(this.props);
    let timer = setInterval(this.props.handleDelete, 15000);
    this.setState({
      timer: timer,
    })
  };

  clearTimer(timer) {
    console.log('TIMER CLEARED');
    clearInterval(this.state.timer);
  }

  // when user clicks adopt, take pet out of state and tell server to delete
  handleAdopt = (pet) => {
    // Determines if the adopted pet is a cat or dog
    // If it is a cat, removes from state
    if (pet === 'cat') {
      let adoptedCat = this.state.cat;

    } else {
      let adoptedDog = this.state.dog.name;
      console.log(this.state.dog.name);
      
      this.setState({
        adoptedPets: this.state.adoptedPets.push(adoptedDog)
      });
      console.log(this.state.adoptedPets);

      petServices.deletePet(pet)
        .then((dog) => {
          
        })
    }
    
  }

  onSubmit = (e) => {
    let petType = e.target.value;
    this.handleAdopt(petType);
    // return to landing page
    // or if we want to keep showing dogs and cats
    //this.props.history.push('/')
  }

  // when user clicks Nevermind, take user to landing page
  handleCancel = () => {
    this.props.history.push('/')
  }

  // clear the timer when moving away from adoption page
  componentWillUnmount() {
    this.clearTimer();
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
            <button 
              className={this.props.currentUser !== 'YOU!' ? 'disabled' : 'enabled'} 
              //disabled={this.props.currentUser !== 'YOU!' ? true : false} 
              value='cat' 
              onClick={(e) => this.onSubmit(e)}>Adopt Me!</button>
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
            <button 
              className={this.props.currentUser !== 'YOU!' ? 'disabled' : 'enabled'} 
              //disabled={this.props.currentUser !== 'YOU!' ? true : false} 
              value='dog' 
              onClick={(e) => this.onSubmit(e)}>Adopt Me!</button>
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