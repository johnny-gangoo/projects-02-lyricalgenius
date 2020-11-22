import React, { Component } from 'react';
import Audio from './audioComponent';

class ListView extends Component {

    render() {
        return (
            <div>
                <img class="albumArt" src={this.props.songObj.albumArt} alt=""></img>
                <div class="card-body">
                    <h5 class="card-songtitle">{this.props.songObj.title}</h5>
                    <p class="card-artistname">{this.props.songObj.name}</p>
                    {this.props.preview[this.props.index] === "" &&
                        <div>
                            <p class="not-available">Preview not available for {this.props.songObj.title} </p>
                            <br></br>
                        </div>
                    }
                    {this.props.preview[this.props.index] !== "" &&
                        <Audio preview={this.props.preview[this.props.index]} />
                    }
                </div>
            </div>
        )
    }
}
export default ListView;