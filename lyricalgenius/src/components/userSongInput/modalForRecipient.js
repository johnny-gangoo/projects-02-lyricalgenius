import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


function ModalForUserInput(props) {
    const [lgShow, setLgShow] = useState(true);
  

    //<SendLyrics LyricsArray={props.LyricsArray} /> 
    return (
      <>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => {
            props.handleResetModal() 
            setLgShow(false)
          }}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
            </Modal.Title>
                <div class="row">
                    <div class="col-12">
                    <h3>Enter the Recipient's Information Below:</h3>
                    </div>
                </div>
          </Modal.Header>
          <Modal.Body>
              here we are going to call your class and give it the array and phone # or email
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default ModalForUserInput;