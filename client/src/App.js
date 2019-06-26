import axios from 'axios'
import React from 'react'
import './App.css';

function Photo(props) {
  return (
    <figure className="App-figure">
      <img className="App-img" src={props.url} alt="" />
    </figure>
  )
}

function PhotosList(props) {
  const elements = props.urls.map(url => <Photo key={url} url={url} />)
  return (
    <div className="App-body">
      {!props.urls.length
        ? <p>There are no items to display</p>
        : elements
      }
    </div>
  )
}

class SearchForm extends React.Component {
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Choose a sol (martian day), a camera, and get the photos taken by NASA's curiosity rover on that day.</legend>
          <label>
            Camera:
            <select value={this.state.camera} onChange={this.handleCameraChange}>
              <option value="fhaz">FHAZ</option>
              <option value="navcam">NAVCAM</option>
              <option value="mast">MAST</option>
              <option value="chemcam">CHEMCAM</option>
              <option value="mahli">MAHLI</option>
              <option value="mardi">MARDI</option>
              <option value="rhaz">RHAZ</option>
            </select>
          </label>
          <label>
            Sol:
            <input type="number" value={this.state.sol} onChange={this.handleSolChange}/>
          </label>
        </fieldset>
        <input type="submit" value="Search" />
      </form>
    )
  }

  constructor(props) {
    super(props)
    this.handleCameraChange = this.handleCameraChange.bind(this)
    this.handleSolChange = this.handleSolChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { camera: 'fhaz', sol: '0' }
  }

  handleCameraChange(e) {
    this.setState({ camera: e.target.value })
  }
  handleSolChange(e) {
    if (Object.is(NaN, Number(e.target.value)) || !Number.isInteger(Number(e.target.value)) || e.target.value < 0) {
      e.target.value = this.state.sol
    } else {
      this.setState({ sol: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { camera, sol } = this.state

    axios.post('/api/search', { camera, sol })
    .then(result => this.props.onPhotoSearch(result.data))
    .catch(error => { 
      console.error('An error has occured while submitting the form. See below:')
      console.error(error)
    })
  }
}

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Discovery Rover Photos</h1>
          <p>More on what resources NASA exposes to the public
            on <a className="App-link" href="https://api.nasa.gov/api.html">Their API page</a>
          </p>
          <SearchForm onPhotoSearch={this.onPhotoSearch} />  
        </header>
  
        <PhotosList urls={this.state.photoUrls} />
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.onPhotoSearch = this.onPhotoSearch.bind(this)
    this.state = { photoUrls: [] }
  }

  onPhotoSearch(data) {
    this.setState({ photoUrls: data.photoUrls })
  }
}

export default App
