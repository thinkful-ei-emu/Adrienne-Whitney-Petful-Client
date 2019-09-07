import React from 'react';
import userService from '../services/users-service';
import './styles/AdoptionPage.css';
import AppContext from '../AppContext';


class AdoptionPage extends React.Component {
  static contextType = AppContext;

  state = {
    adoptedPets: [],
    timer: null,
  }

  // Starts adoption timer and adds YOU to the queue
  componentDidMount() {
    this.startTimer();
    userService.postUser('YOU!');
    this.props.addUser();
  }

  // Starts adoption timer
  startTimer() {
    let timer = setInterval(this.props.handleDelete, 15000);
    this.setState({
      timer: timer,
    })
  };

  // Clears adoption timer
  clearTimer(timer) {
    clearInterval(this.state.timer);
  }

  // Gets pet type and handles pet adoption in App
  onSubmit = (e) => {
    let petType = e.target.value;
    this.context.handleAdopt(petType);
  }

  // Returns user to landing page
  handleCancel = () => {
    this.props.history.push('/')
  }

  // Clears the timer when moving away from adoption page
  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const cat = this.context.cat;
    const dog = this.context.dog;
    return (
      <AppContext.Consumer>
        {(context) => (
          <main>
            <h2>It's your turn to adopt!</h2>
            <div className='AdoptionPage-container'>
              <section className='AdoptionPage-pet-section'>
                <h3>Cats</h3>
                {cat.length !== 0 ? '' : <h4>No cats to adopt!</h4>}
                {cat.length !== 0 ? '' : <button onClick={this.handleCancel}>Go Back</button>}
                {cat.length !== 0 ?
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
                      disabled={this.props.currentUser !== 'YOU!' ? true : false}
                      value='cat'
                      onClick={(e) => this.onSubmit(e)}>Adopt Me!</button>
                    <button onClick={this.handleCancel}>Nevermind</button>
                  </section>
                  : ''}
              </section>

              <section className='AdoptionPage-pet-section'>
                <h3>Dogs</h3>
                {dog.length !== 0 ? '' : <h4>No dogs to adopt!</h4>}
                {dog.length !== 0 ? '' : <button onClick={this.handleCancel}>Go Back</button>}
                {dog.length !== 0 ?
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
                      disabled={this.props.currentUser !== 'YOU!' ? true : false}
                      value='dog'
                      onClick={(e) => this.onSubmit(e)}>Adopt Me!</button>
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