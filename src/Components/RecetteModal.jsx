import React, { useMemo, useEffect, useState } from 'react';
import { Modal } from 'semantic-ui-react';
import { generateDate } from '../helpers/date';
import locale from '../locale';

const RecetteModal = props => {
  const { rightIDs, imageFilepath, modalOpen, onClose, hit } = props;
  const [mainImageUrl, setMainImageUrl] = useState();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    // NOTE: this is failing due to CORS errors currently; ideally we'd make this request and then grab the image filenames from the response
    // const fetchImageFiles = async (idNumber) => {
    //   const id = idNumber.toString();
    //   const prefix2 = id.slice(-3,);
    //   const prefix1 = id.length == 3 ? '000' : id.length == 4 ? `00${id.slice(0,1)}` : id.length == 5 ? `0${id.slice(0,2)}` : id.slice(0,3);
    //   const response = await fetch(`https://images.cfregisters.org.nyc3.digitaloceanspaces.com?prefix=register_images/images/000/${prefix1}/${prefix2}/original`, { headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Host": "images.cfregisters.org.nyc3.digitaloceanspaces.com",
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
    //     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
    //   }}).then((res) => {
    //     return res.body;
    //   });
    //   console.log(response);
    // };

    // rightIDs && fetchImageFiles(rightIDs[0]);

    if (rightIDs) {
      const id = rightIDs[0].toString();
      const prefix2 = id.slice(-3,);
      const prefix1 = id.length == 3 ? '000' : id.length == 4 ? `00${id.slice(0,1)}` : id.length == 5 ? `0${id.slice(0,2)}` : id.slice(0,3);
      const fileName = imageFilepath.replaceAll('r.jpg', '').replaceAll('.jpg', '').replaceAll('M1119', 'M119');
      setMainImageUrl(`https://images.cfregisters.org.nyc3.digitaloceanspaces.com/register_images/images/000/${prefix1}/${prefix2}/original/${fileName}r.jpg`);
    }

  }, [props])

  const imageStrings = imageFilepath ? imageFilepath.split('_') : '';
  const imageRegister = imageStrings[2] || '';
  const imagePage = imageFilepath
    ? imageStrings[imageStrings.length - 1].replace('.jpg', '')
    : '';

  const date = useMemo(() => generateDate(hit.performance_date))

  return (
    <Modal open={modalOpen} closeIcon onClose={handleClose} size="large">
      <Modal.Header>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>{date}</h1>
          <a href={`https://flipbooks.cfregisters.org/${imageRegister}/index.html#page/${imagePage}/mode/2up`} target="_blank" rel="noreferrer" style={{ color: 'black', display: 'flex', alignItems: 'center' }}>{locale['view_flipbook']}<img src="/external-link.svg" alt="" height={40} /></a>
        </div>
      </Modal.Header>
      {imageFilepath && (
        <Modal.Content>
          {/* <iframe
            src={`https://flipbooks.cfregisters.org/${imageRegister}/index.html#page/${imagePage}/mode/2up`}
            title={'Register Image'}
            width={'100%'}
            height={'500px'}
          ></iframe> */}
          { mainImageUrl && <img src={mainImageUrl} style={{ width: '100%' }}/>}
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
