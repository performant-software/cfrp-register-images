import React, { useMemo } from 'react';
import { Modal } from 'semantic-ui-react';
import { generateDate } from '../helpers/date';

const RecetteModal = props => {
  const { imageFilepath, modalOpen, onClose, hit } = props;

  const handleClose = () => {
    onClose();
  };

  const imageStrings = imageFilepath ? imageFilepath.split('_') : '';
  const imageRegister = imageStrings[2] || '';
  const imagePage = imageFilepath
    ? imageStrings[imageStrings.length - 1].replace('.jpg', '')
    : '';

  const date = useMemo(() => generateDate(hit.date))

  return (
    <Modal open={modalOpen} closeIcon onClose={handleClose} size="large">
      <Modal.Header>
        <h1>{date}</h1>
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
          <h3>Aucune image trouvée</h3>
        </Modal.Content>
      )}
    </Modal>
  );
};

export default RecetteModal;
