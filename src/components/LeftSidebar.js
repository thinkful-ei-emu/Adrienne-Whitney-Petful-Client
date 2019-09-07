import React from 'react';
import usersService from '../services/users-service';
import './styles/LeftSidebar.css';

class LeftSidebar extends React.Component {

  state = {
    usersQueue: [],
  }

  // Fetch user queue from server?
  componentDidMount() {
    usersService.getUsers()
      .then(users => {
        this.setState({
          usersQueue: users
        })
      })
  }

  componentDidUpdate() {
    usersService.getUsers()
      .then(users => {
        this.setState({
          usersQueue:users
        })
      })
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