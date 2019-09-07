import React from 'react';
import './styles/LeftSidebar.css';

class LeftSidebar extends React.Component {

  render() {
    // Displays user queue in sidebar
    const users = this.props.usersQueue.length !== 0 ? this.props.usersQueue.map((user, index) => {
      return (
        <li key={index}>{user}</li>
      )
    }) : ''

    return (
      <div className='LeftSidebar-container'>
        <h2>Queue</h2>
        <ul>
          {users}
        </ul>
      </div>
    )
  }
}

export default LeftSidebar;