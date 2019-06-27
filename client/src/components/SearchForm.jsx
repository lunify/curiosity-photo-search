import axios from 'axios'
import React from 'react'

class SearchForm extends React.Component {
  render() {
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
            <input type="number" value={this.state.sol} onChange={this.handleSolChange} />
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
      this.setState({ sol: this.state.sol })
    } else {
      this.setState({ sol: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { camera, sol } = this.state

    axios.post('http://localhost:3001/api/search', { camera, sol })
      .then(result => this.props.onPhotoSearch(result.data))
      .catch(error => {
        console.error('An error has occured while submitting the form. See below:')
        throw error
      })
  }
}

export default SearchForm