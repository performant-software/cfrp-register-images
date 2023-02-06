import React from 'react';
import {
  Modal
} from 'semantic-ui-react';


const RecetteModal = (props) => {
  const { registerId, modalOpen, onClose } = props;

  const handleClose = () => {
    onClose();
  };


  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      size='large'
    >
      <Modal.Header>
        <h1>Register ID {registerId}</h1>
      </Modal.Header>
      <Modal.Content >
        <iframe src="https://flipbooks.cfregisters.org/R105/index.html#page/17/mode/1up" title="Register Image" width="100%" height="600px"></iframe>

      </Modal.Content>
    </Modal>
  );
};

export default RecetteModal;
