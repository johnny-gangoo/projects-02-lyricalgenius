import React, { Component } from 'react';


class DisplayLyrics extends Component{

    render(){
        return(
            <div>
                {this.props.lyricData.map((songObj,index)=> (
                            <li>{songObj}
                                <br></br>
                                <br></br>
                            </li>
                ))}
            </div>
        )
    }
}
export default DisplayLyrics;
