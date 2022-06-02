import React from 'react'
import './App.css'
import NavBar from './components/Navbar'
import NewPost from './components/NewPost'

const App = () => {
  const [file, setFile] = React.useState()
  const [image, setImage] = React.useState()

  React.useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };

    file && getImage();
  },[file])

  return (
    <div className='app'>
      <NavBar />
      {
        image ? (<NewPost image={image}/>) 
        :
        <div className="newPostCard">
        <div className="addPost">
          <div className="img">
            <img 
            src="https://images.pexels.com/photos/11180607/pexels-photo-11180607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt=""
            className='avatar' />
          </div>
          <div className="postForm">
            <input 
            type="text" 
            className='postInput' 
            placeholder="What's on your mind?" />
            <label htmlFor="file">
              <img
              className='addImg'
              src="https://cdn-icons-png.flaticon.com/128/6983/6983233.png" 
              alt=""
               />
               <img
              className='addImg'
              src="https://cdn-icons-png.flaticon.com/128/6983/6983037.png" 
              alt=""
               />
               <img
              className='addImg'
              src="https://cdn-icons-png.flaticon.com/128/6982/6982897.png" 
              alt=""
               />
            </label>
            <input onChange={e => setFile(e.target.files[0])} id='file' style={{display: "none"}} type="file" />
            <button className='btn'>Send</button>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default App