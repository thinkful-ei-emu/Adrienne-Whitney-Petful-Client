import React from 'react';
import './styles/RightSidebar.css';
import AppContext from '../AppContext';

class RightSidebar extends React.Component {
  static contextType = AppContext;

  render() {
    console.log('right sidebar adopted',this.props.adoptedPets);
    return (
      <AppContext.Consumer>
        {(context) => (
    <div className='RightSidebar-container'>
    <h2>Forever Friends</h2>
    <p>These pets have already been adopted</p>
    <p>{this.context.adoptedPets}</p>
    </div>
        )}
    </AppContext.Consumer>
    )
  }
  
}

export default RightSidebar;