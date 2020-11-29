import { Component } from "react";
import favorite from '../functions/favorite.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { getFromStorage, setInStorage} from '../functions/store.js';

class likeButton extends Component{
    state = {
        liked: false
    }

    async componentDidMount(){
        const token = getFromStorage("lgut")
        axios.post("http://localhost:3001/checkIsFavorited", {token: token, song: this.props.song.songData}).then((response) => {
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
                <FontAwesomeIcon icon={faHeart} className="img-fluid" align="right" style={{"height": "80%","width": "5.3%","color": color,"float": "right"}} onClick={() => {favorite({token: getFromStorage("lgut"), data: this.props.song}); this.toggleLike()}}/>
        )
    }
}

export default likeButton;