import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageInput from './components/ImageInput/imageinput';
import Rank from './components/Rank/rank';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FacesRecognition from './components/FacesRecognition/facesrecognition';
import SignIn from './components/SignIn/signin';
import Register from './components/Register/register';

const app = new Clarifai.App({
  apiKey: '9f0bcc11e5d743d497525706488be405'
});

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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  //obtains the boundaries of the face within the picture
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    let { input } = this.state;
    this.setState({ imageUrl: input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }

        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error));
  }

  //changes page depending on route
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
      route = 'signin';
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    let { isSignedIn, imageUrl, route, box } = this.state;
    let { name, entries } = this.state.user;
    return (
      <div className="App" >
        <Particles className='particles'
          params={particlesOptions}
        />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name={name} entries={entries} />
            <ImageInput
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FacesRecognition
              box={box}
              imageUrl={imageUrl}
            />
          </div>
          : (

            this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;