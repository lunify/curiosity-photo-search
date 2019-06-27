import React from 'react'

function Photo({ src, date }) {
  return (
    <figure>
      <img src={src} alt="Mars landscape" />
      <figcaption>Photo taken by curiosity on {date}</figcaption>
    </figure>
  )
}

function PhotosList({ photos }) {
  const elements = photos.map(createPhoto)
  return <div>{elements}</div>
}

export default PhotosList


// *******************************
function createPhoto({ id, src, date}) {
  return <Photo key={id} src={src} date={date} />
}