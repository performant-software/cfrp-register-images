import React from 'react';
import { Modal } from 'semantic-ui-react';

const RecetteModal = props => {
  const { imageFilepath, modalOpen, onClose, title } = props;

  const handleClose = () => {
    onClose();
  };

  const imageStrings = imageFilepath ? imageFilepath.split('_') : '';
  const imageRegister = imageStrings[2] || '';
  const imagePage = imageFilepath
    ? imageStrings[imageStrings.length - 1].replace('.jpg', '')
    : '';

  return (
    <Modal open={modalOpen} closeIcon onClose={handleClose} size="large">
      <Modal.Header>
        <h1>{title}</h1>
      </Modal.Header>
      {imageFilepath && (
        <Modal.Content>
          <iframe
            src={`https://flipbooks.cfregisters.org/${imageRegister}/index.html#page/${imagePage}/mode/2up`}
            title={'Register Image'}
            width={'100%'}
            height={'500px'}
          ></iframe>
        </Modal.Content>
      )}
      {!imageFilepath && (
        <Modal.Content>
          <h3>Aucune image trouvée pour {title}</h3>
        </Modal.Content>
      )}
    </Modal>
  );
};

export default RecetteModal;
