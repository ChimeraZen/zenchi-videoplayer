# ZenChi Video Player
  
**Description**:  The ZenChi Video Player is a React-based video player that uses the File API to allow users to add local video files into a playlist

**Version**:      [0.1.2](#v012)  
**Author**:       Elijah Liedtke (Chimera.Zen)  
**Email**:        [chimera.zen@gmail.com](mailto:chimera.zen@gmail.com)  
**Link**:         https://github.com/ChimeraZen/zenchi-videoplayer

**Copyright**:    Copyright (c) 2018, Elijah Liedtke  
**License**:      http://www.gnu.org/licenses/old-licenses/gpl-2.0.html

## Table of Contents
1. [Instructions](#instructions)
    1. [Installation](#installation)
    2. [Updating](#updating)
    3. [Uninstall](#uninstall)
2. [Components](#components)
    1. [VideoPlayer](#videoplayer)
3. [ChangeLog](#changelog)

---

## Instructions
The following has been provided to assist in installing, updating or removing the ZenChi (pronounced: *zen-Kai*) Video Player. Questions, comments, suggestions and concerns are welcome and can be sent to [chimera.zen@gmail.com](mailto:chimera.zen@gmail.com).

I hope you enjoy this app!

***Note:* Some videos will not work due to codec incompatibility, and browser & device limitations.**

&nbsp;
### Installation
1. Navigate to your app directory and install the ZenChi Video Player package using:
```
npm i zenchi-videoplayer
```
2. Once installed, the VideoPlayer component can be imported using:
```
import { VideoPlayer } from 'zenchi-videoplayer'
```
&nbsp;
### Updating
1. Navigate to your app directory and enter:
```
npm update zenchi-videoplayer
```
&nbsp;
### Uninstall
1. Navigate to your app directory and enter:
```
npm uninstall zenchi-videoplayer
```

&nbsp;
## Components

### VideoPlayer
The ZenChi VideoPlayer component uses React v16.6 and the HTML5 File API to allow users to add local video files into a playlist.

This component can be initialized using `import { VideoPlayer } from 'zenchiapp-videoplayer'`

```
<VideoPlayer />
```

Name        |Type     |Default           |Description
------------|---------|------------------|-------------------------------
id          |string   |                  |*(Optional)* Id props are passed to the top-level container
className   |string   |zenchi-videoplayer|*(Optional)* Class props are passed to the top-level container

&nbsp;
## ChangeLog
### v0.1.2
* Style updates



### v0.1.1
* Style updates
* Added ref to active title for setTimeout connection
  * Active title fades after set 3 seconds
* Added logic to add custom id and classNames to VideoPlayer top-level container
* Added **width: *100%*** to `<video>` element



### v0.1.0
* Initial GIT Commit and NPM package test
