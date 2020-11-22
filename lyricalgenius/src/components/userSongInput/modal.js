import { Button } from 'react-bootstrap';
import React, { useState, Component } from 'react';
import DisplayLyrics from './displayLyricsComponent';
import { Modal } from 'react-bootstrap';
import Audio from './audioComponent';

function LyricsModal(props) {
    const [lgShow, setLgShow] = useState(false);
    console.log(props.songObj)
    console.log(props.songObjIndex);
    return (
        <>
            <Button onClick={() => setLgShow(true)}>Large modal</Button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <div class="row">
                            <div class="col-md-8">
                                <h3>Select the sections you want to send:</h3>
                                <h5>Artist: {props.songObj[props.songObjIndex].name}</h5>
                                <h5>Title: {props.songObj[props.songObjIndex].title}</h5>
                                <Audio preview={props.preview[props.songObjIndex]} />
                            </div>
                        
                            <div class="col-md-4">
                                <img class="img-fluid" src={props.songObj[props.songObjIndex].albumArt} alt="" ></img>
                            </div>

                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DisplayLyrics uniqueLyricData={props.uniqueLyricData} allLyricData={props.allLyricData} />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default LyricsModal;