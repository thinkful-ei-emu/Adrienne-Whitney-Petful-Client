import React from 'react'

class Timer extends React.Component {
  state = {
    time: 6,
    timer: null,
    isOn: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.adoption) {
      return {
        isOn: true,
      }
    }
    return null;
  }

  startTimer = () => {
    let timer = setInterval(this.updateTimer, 1000);
    this.setState({
      timer: timer,
    })
  }

  updateTimer = () => {
    if(this.props.usersQueue.length > 0) {
      this.state.time > 0 ?
    this.setState({
      time: (this.state.time - 1)
    }) : this.resetTimer();
    } else {
      this.stopTimer();
    }
    
  }

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({
      time: 6,
    })
  }

  resetTimer() {
    this.setState({
      time: 6,
    })
  }

  componentDidMount(){
    this.setState({
      isOn: this.props.adoption
    })
    if (this.state.isOn) {
      this.startTimer();
    }
  }

  componentWillUnmount(){
    this.stopTimer();
    this.resetTimer();
  }

  render() {
    let timer = this.state.isOn ? <p className='timer-text'>Next Turn in: 0:0{this.state.time}</p> : '';
    return (
      <div className='Timer'>
        {timer}
      </div>
    )
  }
}
export default Timer;