import React from 'react';
import dogWithGlasses from '../images/landing-page-photo-min.jpg';
import './styles/LandingPage.css';
import {Link} from 'react-router-dom';

export default class LandingPage extends React.Component {
  // handle
  render() {
    return(
      <div className='LandingPage-container'>
        <header>
          <h2>Welcome to Petful, </h2>
          <p>a place where... blah blah blah</p>
        </header>
        <section>
        <img src={dogWithGlasses} alt='dog with glasses' />
        <p>Join the queue by pressing the button below!</p>
        {/* Button should add "YOU!" to the queue */}
          <Link to='/adopt'>
            <button onClick={this.handleStart}>Adopt Now!</button>
          </Link>
        </section>
      </div>
    )
  }
}
