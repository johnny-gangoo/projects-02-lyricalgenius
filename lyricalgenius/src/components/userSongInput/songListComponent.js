import React, { Component } from 'react';
import axios from 'axios';
import Audio from './audioComponent';
import DisplayLyrics from './displayLyricsComponent';

class ListView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            revertToList: false,
            onSubmitClick: true,    
            lyricData: []
        }
    }

    handleListItemOnClick = (songObj) => {
        //const {handleCallBack} = this.props
        //handleCallBack()
        axios.post("http://localhost:3001/getLyrics", songObj).then(res => {
            res = res.data;
            this.setState({ lyricData: [] });
            this.setState({ lyricData: res.uniqueLyrics, onSubmitClick: false});
            
            if (this.state.lyricData.length <= 1) {
                alert("Lyrics for this song not found");
                window.location.reload(false);
            }
        })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <div>
                {this.state.onSubmitClick === true &&
                    this.props.songData.map((songObj, index) => (
                        <li onClick={this.handleListItemOnClick.bind(this, songObj)} key={index}>
                            <div>
                                <p>{songObj.title}  {songObj.name}</p>
                                {this.props.preview[index] === "" &&
                                    <h1>preview could not be found</h1>
                                }
                                {this.props.preview !== "" &&
                                    <Audio preview={this.props.preview[index]} />
                                }
                                <img class="albumArt" src={songObj.albumArt}></img>

                            </div>
                        </li>
                    ))}

                {this.state.onSubmitClick === false && 
                    <div>
                        <DisplayLyrics lyricData={this.state.lyricData} />  
                    </div>
                }
            </div>
        )
    }
}
export default ListView;