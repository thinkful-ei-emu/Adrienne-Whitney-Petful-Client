import React from 'react';
import './styles/LeftSidebar.css';

class LeftSidebar extends React.Component {



  render() {
    // displays user queue in sidebar
    console.log(this.props.usersQueue)
    const users = this.props.usersQueue ? this.props.usersQueue.map((user, index) => {
      return (
        <li key={index}>{user}</li>
      )
    }) : ''

    return(
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