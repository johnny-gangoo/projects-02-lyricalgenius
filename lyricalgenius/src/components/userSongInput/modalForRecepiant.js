import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


function ModalForUserInput(props) {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
  

    //<SendLyrics LyricsArray={props.LyricsArray} /> 
    return (
      <>
        <Button onClick={() => setLgShow(true)}>Done</Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
            </Modal.Title>
                <div class="row">
                    <div class="col-12">
                    <h3>Please Fill Out the Form Below:</h3>
                    </div>
                </div>
          </Modal.Header>
          <Modal.Body>
              here we are going to call your fn and give it the array and phone # or email
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default ModalForUserInput;