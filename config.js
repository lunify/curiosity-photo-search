module.exports = {
  port: process.env.PORT || 3001,
  nasaAPI: {
    baseURL: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
    key: 'DEMO_KEY'
  }
}
