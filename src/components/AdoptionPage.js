import React from 'react';
import userService from '../services/users-service';
import './styles/AdoptionPage.css';
import AppContext from '../AppContext';


class AdoptionPage extends React.Component {
  static contextType = AppContext;

  state = {
    adoptedPets: [],
    timer: null,
    catTimer: null,
    dogTimer: null,
    catTimer2: null,
    dogTimer2: null,
  }

  // Starts adoption timer and adds YOU to the queue
  componentDidMount() {
    console.log(this.props, 'PROPS');
    this.startTimer();
    userService.postUser('YOU!');
    this.props.addUser();
    this.props.handleTimerStart();
  }

  // Starts adoption timer
  startTimer() {
    let timer = setInterval(this.props.handleDelete, 7000);
    let catTimer = setTimeout(this.props.handleAdoptCat, 6000);
    let dogTimer = setTimeout(this.props.handleAdoptDog, 12000);
    let catTimer2 = setTimeout(this.props.handleAdoptCat, 17000);
    let dogTimer2 = setTimeout(this.props.handleAdoptDog, 25000);
    this.setState({
      timer: timer,
      catTimer: catTimer,
      dogTimer: dogTimer,
      catTimer2: catTimer2,
      dogTimer2: dogTimer2
    })
  };

  // Clears adoption timer
  clearTimer(timer) {
    clearInterval(this.state.timer);
    clearTimeout(this.state.catTimer);
    clearTimeout(this.state.dogTimer);
    clearTimeout(this.state.catTimer2);
    clearTimeout(this.state.dogTimer2);
  }

  // Gets pet type and handles pet adoption in App
  onSubmit = (e) => {
    let petType = e.target.value;
    if (petType === 'cat') {
      this.context.handleAdoptCat();
    } else {
      this.context.handleAdoptDog();
    }
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