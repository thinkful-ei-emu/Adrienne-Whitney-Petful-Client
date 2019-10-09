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
    const timer = this.props.adoption ? <Timer adoption={this.props.adoption}/> : ''

    return (
      <div className='LeftSidebar-container'>
        <h2>Queue</h2>
        {timer}
        <ul>
          {users}
        </ul>
      </div>
    )
  }
}

export default LeftSidebar;