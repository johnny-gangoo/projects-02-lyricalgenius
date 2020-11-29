import React, { Component } from 'react';
import $ from 'jquery';
import LikeButton from './likeButton.js';
import ModalForUserInput from './modalForRecipient'

class DisplayLyrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            clearColors: [],
            isSectionsArrayEmpty: true
        }
    }

    sendSections = async () => {
        // //will send to Vlad from here
        if (this.state.sections.length !== 0) {
            await this.setState({ isSectionsArrayEmpty: false })
        }
        console.log(this.state.sections);
    }

    sendAll = async (allSections) => {
        await this.setState({ isSectionsArrayEmpty: false })
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
        await this.setState({ sections: [], clearColors: [] })
        console.log("this is sections " + this.state.sections)
    }

    handleResetModal = async () => {
        this.setState({ isSectionsArrayEmpty: true });
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-12">
                        {this.state.isSectionsArrayEmpty === false && <ModalForUserInput LyricsArray={this.state.sections} handleResetModal={this.handleResetModal.bind(this)} />}
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
                        <LikeButton song={this.props} />
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
                        <LikeButton song={this.props} />
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        )
    }
}
export default DisplayLyrics;
