import React from 'react';
import './styles/RightSidebar.css';
import AppContext from '../AppContext';

class RightSidebar extends React.Component {
  static contextType = AppContext;


  render() {
    const adopted = this.context.adoptedPets ? this.context.adoptedPets.map((pet, index) => {
      return (
        <li key={index}>{pet}</li>
      )
    }) : ''
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className='RightSidebar-container'>
            <h2>Forever Friends</h2>
            <p>These pets have already been adopted</p>
            <ul>
              {adopted}
            </ul>
          </div>
        )}
      </AppContext.Consumer>
    )
  }
}

export default RightSidebar;