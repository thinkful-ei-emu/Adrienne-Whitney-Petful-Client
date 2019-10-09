import React from 'react'

class Timer extends React.Component {
  state = {
    time: 10,
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
    let timer = setInterval(this.updateTimer, 1000)
    this.setState({
      timer: timer,
    })
  }

  updateTimer = () => {
    this.state.time > 0 ?
    this.setState({
      time: (this.state.time - 1)
    }) : this.resetTimer();
  }

  stopTimer() {
    this.clearInterval(this.state.timer);
    this.setState({
      time: 10,
    })
  }

  resetTimer() {
    this.setState({
      time: 10,
    })
  }

  componentDidMount(){
    this.setState({
      isOn: this.props.adoption
    })
    if (this.state.adoption) {
      this.startTimer();
    }
  }

  componentWillUnmount(){
    this.stopTimer();
    this.resetTimer();
  }

  render() {
    let timer = this.state.isOn ? <span>Next Turn in: 0:{this.state.time}</span> : '';
    return (
      <div className='Timer'>
        {timer}
      </div>
    )
  }
}
export default Timer;