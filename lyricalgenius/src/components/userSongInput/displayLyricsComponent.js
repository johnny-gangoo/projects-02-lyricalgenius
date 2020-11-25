import React, { Component } from 'react';
import $ from 'jquery';
import favorite from '../functions/favorite.js';
import emptyheart from '../../images/icons/empty-heart.png';

class DisplayLyrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            counter: 0
        }
    }

    selections = (songObj) => {
        let new_state = Object.assign({}, this.state);
        let a = new_state.sections;
        a[this.state.counter] = songObj;
        this.setState({ sections: a, counter: this.state.counter + 1 });
    }

    sendSections = () => {
        //will send to Vlad from here
        console.log(this.state.sections);
    }

    sendAll = (allSections) => {
        //will send to Vlad from here

        console.log(allSections)
    }

    changeColor = () => {
            console.log("hi");

    }

    render() {
        return (
            <div>
                <button onClick={this.sendSections.bind(this)}>Done</button>
                <button onClick={this.sendAll.bind(this, this.props.allLyricData)}>Send All</button><br></br>
                <img class="img-fluid" style={{"height": "10%","width": "10%"}} src={emptyheart} onClick={() => favorite(this.props)}></img>
                <br></br>
                {this.props.uniqueLyricData.map((songObj, index) => (
                    <li class="ListItemLyrics" onClick={() => {
                        if ($("li.ListItemLyrics").eq(index).css("background-color") === "rgb(51, 51, 51)") {
                        $("li.ListItemLyrics").eq(index).css("background-color", "#1796cf");
                        this.changeColor();
                    } else {
                        this.changeColor();
                        $("li.ListItemLyrics").eq(index).css("background-color", "#EBF2FF");
                    }}}   
                    >
                        {songObj}
                        <br></br>
                        <br></br>
                    </li>
                ))}

            </div>
        )
    }
}
export default DisplayLyrics;
