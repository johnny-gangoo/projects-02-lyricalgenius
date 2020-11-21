import React, { Component } from 'react';
import Audio from './audioComponent';

class ListView extends Component {

    render() {
        return (
            <div>
                <p>{this.props.songObj.title}  {this.props.songObj.name}</p>
                {this.props.preview[this.props.index] === "" &&
                    <h1>preview could not be found</h1>
                }
                <img class="albumArt" src={this.props.songObj.albumArt} alt=""></img>
                {this.props.preview[this.props.index] !== "" &&
                    <Audio preview={this.props.preview[this.props.index]} />
                }
            </div>
        )
    }
}
export default ListView;