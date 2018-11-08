import React, { Component } from 'react'
import './styles.css'

export default class VideoPlayer extends Component {
  state = {
    activeItem: 0,
    playlist: []
  }

  videoRef = React.createRef()


  // Create the playlist based off the user-added videos
  handleFiles = (e) => {
    const files = e.target.files,
          playlist = []
    let i = 0
    console.log(files)
    while(i < files.length) {
      const file = files[i],
            objectURL = window.URL.createObjectURL(file),
            fileName = file.name,
            playlistItem = {
              // Name strips the last '.' and file extension
              name: fileName.substring(0, fileName.lastIndexOf('.')),
              type: file.type,
              src: objectURL
            }
      
      playlist.push(playlistItem)
      i++
    }
    
    this.setState({
      playlist: playlist
    })
  }
  
  
  // Set the active video to selected playlist item
  handleChangeItem = (e) => {
    const activeItem = parseInt(e.currentTarget.dataset.id)
    this.setState({ activeItem: activeItem })
  }
  
  
  // Build the source element
  buildSource = (activeItem) => {
    const item = this.state.playlist[activeItem],
          source = document.createElement('source'),
          video = this.videoRef.current
    
    // Pause the video and clear the source
    this.clearVideoSource()
    
    // Set the source parameters
    video.src = item.src
    video.type = item.type
    
    // Append the source element to the videoRef and load
    video.appendChild(source)
    video.load()

    // Start playing the video
    video.play()
  }
  
  
  // Clear the video source
  clearVideoSource = () => {
    const video = this.videoRef.current
    video.innerHTML = ''
  }
  
  
  render() {
    console.log(this.state)
    const activeVideoTitle = this.state.playlist.length > 0 && this.state.playlist[this.state.activeItem].name,
          playlistId = "playlist-" + Math.floor(Math.random() * 1000)
    
    // Build the source element and load the active video
    this.state.playlist.length > 0 && this.buildSource(this.state.activeItem)
    
    return (
      <div className="zenchi-videoplayer">
        <section className="videoplayer">
          <header>
            <h3>{activeVideoTitle}</h3>
          </header>
          
          <video controls ref={this.videoRef}></video>
        </section>
        
        <section className="playlist">
          <header>
            <h2>Playlist</h2>
            <label htmlFor={playlistId} className="playlist-input" title="Add to playlist">
              <i>+</i>
              <input id={playlistId} type="file" onChange={this.handleFiles} multiple/>
            </label>
          </header>

          <ul>
            {this.state.playlist.length > 0
              ? this.state.playlist.map((item, i) => {
                  return <li key={item.name + '_' + i} data-id={i} className={this.state.activeItem === i ? "active" : null} onClick={this.handleChangeItem}>
                    {i + 1 + "."}
                    <span className="item-name" data-id={i}>
                      {item.name}
                    </span>
                  </li>
                })
              : <li className="empty">Playlist is empty</li>
            }
          </ul>
        </section>
      </div>
    )
  }
}
