import React from 'react';
import './styles/LeftSidebar.css';

class LeftSidebar extends React.Component {

  state = {
    usersQueue: ['Chris', 'Tara', 'YOU!', 'Zane', 'Arpan'],
  }

  // Fetch user queue from server?
  componentDidMount() {
    // get users service here
  }


  render() {
    // displays user queue in sidebar
    const users = this.state.usersQueue.map((user, index) => {
      return (
        <li key={index}>{user}</li>
      )
    })

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