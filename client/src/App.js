import React from 'react'
import SearchForm from './components/SearchForm'
import PhotosList from './components/PhotosList'
import './App.css';

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

        <PhotosList photos={this.state.photos} />
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.onPhotoSearch = this.onPhotoSearch.bind(this)
    this.state = { photos: [] }
  }

  onPhotoSearch({ photos }) {
    this.setState({ photos })
  }
}

export default App
