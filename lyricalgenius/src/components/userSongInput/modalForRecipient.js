import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SendLyrics from "../sharePhoneEmail/phoneEmailAPI";


function ModalForUserInput(props) {
    const [lgShow, setLgShow] = useState(true);
  
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
              <SendLyrics LyricsArray={props.LyricsArray} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default ModalForUserInput;