import React, { Component } from 'react'
import './styles.css'

export default class VideoPlayer extends Component {
  state = {
    activeItem: 0,
    playlist: []
  }

  videoRef = React.createRef()
  activeTitleRef = React.createRef()

  componentDidMount() {
    this.activeTitleRef.current.style.opacity = 1
  }

  fadeActiveTitle = () => {
    const titleRef = this.activeTitleRef.current
    
    if(titleRef.style.opacity > 0) {
      titleRef.style.opacity = titleRef.style.opacity - 0.01
      requestAnimationFrame(this.fadeActiveTitle)
    }
  }


  // Create the playlist based off the user-added videos
  handleFiles = (e) => {
    const files = e.target.files,
          playlist = []
    let i = 0
    
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
    
    // Reset the title to visible
    this.activeTitleRef.current.style.opacity = 1
    
    // Set the active item
    this.setState({ activeItem: activeItem })
  }
  
  
  // Build playlist
  buildPlaylist = () => (
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
  )
  
  
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
    
    // Fade out the active title after 3s
    setTimeout(this.fadeActiveTitle, 3000)
  }
  
  
  // Clear the video source
  clearVideoSource = () => {
    const video = this.videoRef.current
    video.innerHTML = ''
  }
  
  
  render() {
    const activeVideoTitle = this.state.playlist.length > 0 && this.state.playlist[this.state.activeItem].name,
          playlistId = "playlist-" + Math.floor(Math.random() * 1000),
          playlist = this.buildPlaylist(),
          
          // Add the custom ID and base className
          id = this.props.id ? this.props.id : null,
          classNames = ["zenchi-videoplayer"]
    
    // Build the source element and load the active video
    this.state.playlist.length > 0 && this.buildSource(this.state.activeItem)
    
    // Add custom classes
    this.props.className && classNames.push(this.props.className)
    
    return (
      <div id={id} className={classNames.join(" ")}>
        <section className="videoplayer">
          <header>
            <h3 ref={this.activeTitleRef}>{activeVideoTitle}</h3>
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

          {playlist}
        </section>
      </div>
    )
  }
}
