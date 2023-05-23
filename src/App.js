import './App.css';
import { React, Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLink from './Components/ImageLink/ImageLink';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import MouseParticles from 'react-mouse-particles';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

const setupImageURL = (imageURL) => {
  const PAT = '0615b0b2bfe8458c85faea214d104b21';
  const USER_ID = 'rohaan_7';       
  const APP_ID = 'face';
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};

return requestOptions;
}


const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}
class App extends Component {
  constructor () {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.entries,
    }})
  }

  calculateBox = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimg');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcol: face.left_col * width,
      toprow: face.top_row * height,
      rightcol: width - (face.right_col * width),
      bottomrow: height - (face.bottom_row * height)
    }
  }

  displayBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", setupImageURL(this.state.input))
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count }))
      })
      .catch(console.log)
      }
      this.displayBox(this.calculateBox(response))})
    .catch(error => console.log('error', error));
  }

  onRouteChange = (page) => {
    this.setState({route: page})
    if (page === 'signout') {
      this.setState(initialState)
      this.setState({route: 'signin'})
    } else if (page === 'home') {
      this.setState({isSignedIn: true})
    }
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#ff0000"/>
        <MouseParticles g={1} color="random" cull="col,image-wrapper"/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
          </div> : (
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
