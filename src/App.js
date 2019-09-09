import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageInput from './components/ImageInput/imageinput';
import Rank from './components/Rank/rank';
// import FaceRecognition from './facerecognition'
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 250,
      density: {
        enable: false,
        value_area: 4700
      }
    },
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click')
  }

  render() {
    return (<div className="App" >
      <Particles className='particles'
        params={particlesOptions}
      />

      <Navigation />
      <Logo />
      <Rank />
      <ImageInput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />


    </div>
    );
  }
}

export default App;