import React, { Component } from 'react';
import $ from 'jquery';
import favorite from '../functions/favorite.js';
import emptyheart from '../../images/icons/empty-heart.png';

class DisplayLyrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            clearColors: []
        }
    }

    sendSections = () => {
        // //will send to Vlad from here
        console.log(this.state.sections);
    
    }

    sendAll = (allSections) => {
        //will send to Vlad from here
        console.log(allSections)
    }

    addToSectionsArray = async (songObj, index) => {
        await this.setState({ clearColors: [...this.state.clearColors, index] })
        await this.setState({ sections: [...this.state.sections, songObj] });

        console.log("Add to sections before " + this.state.sections)
    }


    removeFromSectionsArray = async (songObj, index) => {

        var array = [...this.state.clearColors]; // make a separate copy of the array
        if (index !== -1) {
            var getIndex = array.indexOf(index)
            array.splice(getIndex, 1);
            await this.setState({ clearColors: array });
        }

        var array = [...this.state.sections]; // make a separate copy of the array
        var index = array.indexOf(songObj)
        if (index !== -1) {
            array.splice(index, 1);
            console.log("this is what we are removing " + this.state.sections[index])
            await this.setState({ sections: array });
        }

        console.log("sections after " + this.state.sections)
    }

    clearAllClickedSections = (index) => {
        if ($("li.ListItemLyrics").eq(index).css("background-color") === "rgb(133, 222, 177)") {
            $("li.ListItemLyrics").eq(index).css("background-color", "#fff");
        }
    }

    setSectionsColor = (songObj, index) => {
        if ($("li.ListItemLyrics").eq(index).css("background-color") === "rgb(133, 222, 177)") {
            $("li.ListItemLyrics").eq(index).css("background-color", "#fff");
            this.removeFromSectionsArray(songObj, index);
        } else {
            this.addToSectionsArray(songObj, index);
            $("li.ListItemLyrics").eq(index).css("background-color", "#85DEB1");
        }
    }

    resetState = async () => { 
        await this.setState({sections: [], clearColors: []})
        console.log("this is sections " + this.state.sections)
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-12">
                        <button onClick={this.sendSections.bind(this)}>Done</button>
                        <button onClick={this.sendAll.bind(this, this.props.allLyricData)}>Send All</button>
                        <button onClick={() => {
                            <li class="ListItemLyrics">
                                {this.state.clearColors.map((index) => {
                                    this.clearAllClickedSections(index);
                                })}
                                {this.resetState()}
                            </li>
                        }}>Clear Selections</button>
                        <img class="img-fluid" align="right" style={{ "height": "75%", "width": "5.3%" }} src={emptyheart} onClick={() => favorite(this.props)}></img>
                        <br></br>
                        <br></br>

                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        {this.props.uniqueLyricData.map((songObj, index) => (
                            <li class="ListItemLyrics" onClick={() => {
                                this.setSectionsColor(songObj, index);
                            }}
                            >
                                {songObj}
                                <br></br>
                                <br></br>
                            </li>
                        ))}
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                    <br></br>
                        <button onClick={this.sendSections.bind(this)}>Done</button>
                        <button onClick={this.sendAll.bind(this, this.props.allLyricData)}>Send All</button>
                        <button onClick={() => {
                            <li class="ListItemLyrics">
                                {this.state.clearColors.map((index) => {
                                    this.clearAllClickedSections(index);
                                })}
                                {this.resetState()}
                            </li>
                        }}>Clear Selections</button>
                        <img class="img-fluid" align="right" style={{ "height": "55%", "width": "5%" }} src={emptyheart} onClick={() => favorite(this.props)}></img>
                        <br></br>
                        <br></br>
            </div>
                    </div>
            </div>
        )
    }
}
export default DisplayLyrics;
