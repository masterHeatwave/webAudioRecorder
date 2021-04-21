import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import logo from './cassette.gif';
import background from './binaryBackground.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }
  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }
  header() {
    // Import result is the URL of your image
    return <img src={logo} alt="Logo" />;
  }
  body() {
    return <img src={background} alt="BackgroundImg" />;
  }
  render() {
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
            {this.state.audio ? 'Stop microphone' : 'Record from mic/input'}
          </button>
        </div>
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default App;