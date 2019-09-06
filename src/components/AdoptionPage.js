import React from 'react';
import testImage from '../images/landing-page-photo-min.jpg';import './styles/AdoptionPage.css';

function AdoptionPage() {

  return(
    <div className='AdoptionPage-container'>
    {/* Should only come on when "YOU" is first in queue */}
      <h2>It's your turn to adopt!</h2>
      <section className='AdoptionPage-pet-section'>
        <h3>Cats</h3>
        <section className='AdoptionPage-pet-info'>
          <h4>Name</h4>
          <section className='AdoptionPage-image-list-container'>        
            <img src={testImage} alt='test image' />
            <ul>
              <li>Age: </li>
              <li>Gender: </li>
              <li>Breed: </li>
            </ul>
          </section>
          <p>Description: </p>
          <p>Shelter Story: </p>
        </section>
      </section>

      <section className='AdoptionPage-pet-section'>
        <h3>Dogs</h3>
        <section className='AdoptionPage-pet-info'>
          <h4>Name</h4>
          <section className='AdoptionPage-image-list-container'>        
            <img src={testImage} alt='test image' />
            <ul>
              <li>Age: </li>
              <li>Gender: </li>
              <li>Breed: </li>
            </ul>
          </section>
          <p>Description: </p>
          <p>Shelter Story: </p>
        </section>
      </section>
    </div>
  )
}

export default AdoptionPage;