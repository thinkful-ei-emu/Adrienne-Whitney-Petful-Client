import React from 'react';
import userService from '../services/users-service';
import dogWithGlasses from '../images/landing-page-photo-min.jpg';
import './styles/LandingPage.css';
import {Link} from 'react-router-dom';

export default class LandingPage extends React.Component {
  
  render() {
    return(
      <div className='LandingPage-container'>
        <header>
          <h2>Welcome to Petful, </h2>
          <p>Petful is a place where you can find that furry forever friend you've been looking for!
            Once you've decided to adopt, your name will be added to the queue of humans waiting to meet their next best friend. 
            You can see where you are by looking at the queue and finding 'YOU!'.  As the humans before you
            find their fuzzy friends, your name will rise to the top of the list.  Once your name is at the
            top, you will see available pets looking for their forever home waiting for you to click "Adopt"!  
            While you're waiting for your turn, you can see the available pets, but won't be able to adopt
            until it is your turn.</p>
            <p>When you're ready, click on the "Adopt Now" button below!
          </p>
        </header>
        <section>
        <img src={dogWithGlasses} alt='dog with glasses' />
        <p>Join the queue by pressing the button below!</p>
        {/* Button should add "YOU!" to the queue */}
          <Link to='/adopt'>
            <button>Adopt Now!</button>
          </Link>
        </section>
      </div>
    )
  }
}
