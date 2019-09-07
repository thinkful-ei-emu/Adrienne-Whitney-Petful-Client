import React from 'react';
// import catServices from '../services/cat-services';
import petServices from '../services/pet-services';
import './styles/AdoptionPage.css';
import AppContext from '../AppContext';


// need page to rerender once a pet has been deleted
class AdoptionPage extends React.Component {
  static contextType = AppContext;

  state = {
    dog: null,
    cat: null,
  }
  // when the component mounts, get the dog and cat queues from server
  componentDidMount() {
   petServices.getPet('dog')
    .then((dog) => {
      const currDog = dog.first.value;
      this.setState({dog: currDog})
    })
    petServices.getPet('cat')
      .then((cat) => {
        const currCat = cat.first.value;
        this.setState({cat: currCat})
      });
  }

  // when user clicks adopt, take pet out of state and tell server to delete
  // will need to move to app.js and pass down as props to adoption and right sidebar
  // handleAdopt = (pet) => {
  //   console.log('props', this.props.adoptedPets);
  //   petServices.deletePet(pet);
  //   // Determines if the adopted pet is a cat or dog
  //   if (pet === 'cat') {
  //     let adoptedCat = this.state.cat.name;
  //     petServices.getPet('cat')
  //     .then((cat) => {
  //       console.log('new cat?',cat.name);
  //       const tempAdopted = this.props.adoptedPets;
  //       tempAdopted.push(adoptedCat);
  //       console.log('tempAdopted', tempAdopted);
  //       this.setState({cat, adoptedPets: tempAdopted})
  //       this.forceUpdate();
  //     })
  //     console.log('adopted pets', this.state.adoptedPets);
  //   } else {
  //     let adoptedDog = this.state.dog.name;
  //     petServices.getPet('dog')
  //     .then((dog) => {
  //       console.log('new dog?',dog.name);
  //       const tempAdopted = this.props.adoptedPets;
  //       tempAdopted.push(adoptedDog);
  //       console.log('tempAdopted', tempAdopted);
  //       this.setState({dog, adoptedPets: tempAdopted})
  //       this.forceUpdate();
  //     })
  //   }
  //   console.log('adopted', this.props.adoptedPets);
  // }

  onSubmit = (e) => {
    let petType = e.target.value;
    this.context.handleAdopt(petType);
  }

  // when user clicks Nevermind, take user out of queue
  handleCancel = () => {
    this.props.history.push('/');
  }

  render() {
    const cat = this.state.cat;
    const dog = this.state.dog;
    return(
      <AppContext.Consumer>
        {(context) => (
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
        )}
    </AppContext.Consumer>
    )
  }
  
}

export default AdoptionPage;