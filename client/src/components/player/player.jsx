import React, { Component } from "react";
import ReactPlayer from 'react-player'
import Duration from './duration'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledWhiteIcon from '@material-ui/icons/PauseCircleFilled';

// Package reference:       https://www.npmjs.com/package/react-player
// Source code reference :  https://github.com/CookPete/react-player/blob/master/src/demo/App.js

class Player extends Component {
    state = {
        url: null, //'https://p.scdn.co/mp3-preview/47b782934fcc72b4d07b4e837de5ac4824b45620', // Make dynamic
        title: 'Bread Cat Podcasts', // Make dynamic
        artist: 'The bread cats? I dunno.', // Make dynamic
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        image: 'https://cdn.trendhunterstatic.com/thumbs/cat-bread.jpeg'
      }

    ref = player => {
        this.player = player
    }

    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleStop = () => {
        this.setState({ url: null, playing: false })
    }

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }
    
    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }
    
    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    }
    
    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }

    load = url => {
        this.setState({
          url,
          played: 0,
          loaded: 0,
          pip: false
        })
    }
    render() {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;

        return (
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#545454', padding: '20px 10px 20px 20px', position: 'absolute', bottom: '0px', left: '0px', zIndex: '2'}}>
                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={url}
                    pip={pip}
                    playing={playing}
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.handlePlay}
                    onEnablePIP={this.handleEnablePIP}
                    onDisablePIP={this.handleDisablePIP}
                    onPause={this.handlePause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.handleEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                    style={{display: 'none'}}
                />
                <div style={{display: 'flex', width: '500px'}}>
                    {this.state.image ? <img style={{width:'70px', height:'70px', borderRadius: '50%', borderColor: 'white', padding:'10px', borderStyle: 'dotted'}} src={this.state.image}/> : null}
                    <div style={{margin: '20px 0 auto 0 ', color: 'white', paddingLeft: '10px'}}>
                        <p style={{fontWeight:'bold', margin: '0'}}>{this.state.title}</p>
                        <p style={{margin: '0'}}>{this.state.artist}</p>
                    </div>
                </div>
                <div style={{display: 'block'}}>
                    <button onClick={this.handlePlayPause}>{playing ? <PauseCircleFilledWhiteIcon/> : <PlayCircleFilledWhiteIcon/> }</button>
                    <input
                        type='range' min={0} max={0.999999} step='any'
                        value={played}
                        onMouseDown={this.handleSeekMouseDown}
                        onChange={this.handleSeekChange}
                        onMouseUp={this.handleSeekMouseUp}
                    />
                    <Duration></Duration>
                </div>
                
                
                {/* <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} /> */}

            </div>
        )
    }
}

export default Player;