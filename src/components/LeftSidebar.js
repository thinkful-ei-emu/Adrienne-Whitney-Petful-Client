import React from 'react';
import Timer from './Timer';
import './styles/LeftSidebar.css';

class LeftSidebar extends React.Component {
  render() {
    // Displays user queue in sidebar
    const users = this.props.usersQueue.length !== 0 ? this.props.usersQueue.map((user, index) => {
      return (
        <li key={index}>{user}</li>
      )
    }) : ''
    const timer = this.props.adoption ? <Timer adoption={this.props.adoption}  usersQueue={this.props.usersQueue}/> : ''

    return (
      <div className='LeftSidebar-container'>
        <h2>Queue</h2>
        {timer}
        <ul className='users'>
          {users}
        </ul>
      </div>
    )
  }
}

export default LeftSidebar;