import React from 'react';
import dogWithGlasses from '../images/landing-page-photo-min.jpg';
import './styles/LandingPage.css';

function LandingPage() {

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
      <button>Adopt Now!</button>
      </section>
    </div>
  )
}

export default LandingPage;