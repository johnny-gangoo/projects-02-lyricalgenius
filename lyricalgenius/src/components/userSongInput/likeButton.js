import { Component } from "react";
import favorite from '../functions/favorite.js';
import emptyheart from '../../images/icons/empty-heart.png';
import checkIsFavorited from "../functions/isfavorited.js";
import axios from 'axios';

class likeButton extends Component{
    state = {
        liked: false
    }

    async componentDidMount(){
        axios.post("http://localhost:3001/checkIsFavorited", {username: "test100", song: this.props.song.songData}).then((response) => {
            console.log(response);
            this.setState({liked: response.data});
        },(error) => {
            console.log(error.response)
        });
        
    }

    toggleLike(state){
        this.setState({
            liked: !this.state.liked
        });
    }

    render () {
        const color = this.state.liked ? "red" : "";
        return (
                <img className="img-fluid" align="right" style={{"height": "75%","width": "5.3%","background": color}} src={emptyheart} onClick={() => {favorite(this.props.song); this.toggleLike()}}></img>
        )
    }
}

export default likeButton;