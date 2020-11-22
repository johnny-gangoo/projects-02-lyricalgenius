import React, { Component } from 'react';
import Audio from './audioComponent';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class ListView extends Component {

    render() {
        return (
            <div class="row">
                <div class="col-sm-4">
                    <div class="card">
                        <img class="albumArt" src={this.props.songObj.albumArt} alt=""></img>
                        <div class="card-body">
                            <h5 class="card-songtitle">{this.props.songObj.title}</h5>
                            <p class="card-artistname">{this.props.songObj.name}</p>
                            {this.props.preview[this.props.index] === "" &&
                                <p>Preview not available for {this.props.songObj.title} </p>
                            }
                            {this.props.preview[this.props.index] !== "" &&
                                <Audio preview={this.props.preview[this.props.index]} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
        // return (
        //     <div class="card">
        //         <p>{this.props.songObj.title}  {this.props.songObj.name}</p>
        //         {this.props.preview[this.props.index] === "" &&
        //             <h1>preview could not be found</h1>
        //         }
        //         <img class="albumArt" src={this.props.songObj.albumArt} alt=""></img>
        //         {this.props.preview[this.props.index] !== "" &&
        //             <Audio preview={this.props.preview[this.props.index]} />
        //         }
        //     </div>
        // )
    }
}
export default ListView;