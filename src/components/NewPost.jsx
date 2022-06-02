import React from 'react'
import * as faceapi from 'face-api.js'

const NewPost = ({image}) => {
    const {url, width, height} = image
    const imgRef = React.useRef()
    const canvasRef = React.useRef()
    const [faces, setFaces] = React.useState([])
    const [friends, setFriends] = React.useState()

    const handleImage = async () => {
      const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      setFaces(detections.map(d => Object.values(d.box)))
  }

  const enter = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.lineWidth = 1
    ctx.strokeStyle = 'indigo'
    faces.map( i => ctx.strokeRect(...i))
  }

  React.useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]).then(handleImage)
      .catch(e => console.log(e))
    }
    imgRef.current && loadModels()
  }, [])

  const addFriend = (e) => {
    setFriends(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  return (
    <div className='container'>
        <div className="left" style={{width,height}}>
          <img className='photo' ref={imgRef} crossOrigin='anonymous' src={url} alt="" />
          <canvas onMouseEnter={enter} ref={canvasRef} width={width} height={height}/>
          {
            faces.map((face, i) => (
              <input
              name={`input${i}`}
              onChange={addFriend}
              style={{left: face[0], top: face[1] + face[3]}}
              className='tag' key={i} type="text" placeholder='Tag yout friend' />
            ))
          }
        </div>
        <div className="right">
          <h1>Share your post</h1>
          <input type="text" placeholder='What is on your mind?' className='rightInput' />
          {friends && <span className='friends'>
            With <span className='friend'>{[...Object.values(friends)].map(i => ' #' + i)}</span>
            </span>}
          <button className='rightButton'>Send</button>
        </div>
    </div>
  )
}

export default NewPost