import React, { Component } from 'react';


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

    render() {
        return (
            <div>
                <h3>Select the portions you would like to send then press Done</h3>
                <h3>Or press send all to send over the entire song</h3>
                <button onClick={this.sendSections.bind(this)}>Done</button>
                <button onClick={this.sendAll.bind(this, this.props.allLyricData)}>Send All</button><br></br>
                <br></br>
                {this.props.uniqueLyricData.map((songObj, index) => (
                    <li onClick={this.selections.bind(this, songObj)}>
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
