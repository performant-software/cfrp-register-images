import React, { useState } from 'react';
import { Divider } from 'semantic-ui-react';

import RecetteModal from './RecetteModal';

const ResultCard = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const capitalize = string =>
    string ? string[0].toUpperCase() + string.slice(1) : string;

  return (
    <span
      style={{ display: 'flex', width: '100%' }}
      onClick={() => {
        if (!modalOpen) {
          setModalOpen(true);
        }
      }}
    >
      <RecetteModal
        imageFilepath={props.hit.register_image_filename}
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        hit={props.hit}
      />

      <div style={{ width: '50%' }}>
        <b>Titre:</b> {props.hit.titre}
        <br />
        <b>Genre:</b> {capitalize(props.hit.genre)}
        <br />
        <b>Nombre d&apos;actes:</b> {props.hit.actes}
        <br />
        <b>Ordre:</b> {props.hit.ordre}
        <br />
        <Divider />
        <b>Nom D&apos;Auteur:</b> {props.hit.nom_dauteur}
        <br />
      </div>

      <div style={{ width: '50%', marginLeft: '25px' }}>
        <b>Saison:</b> {props.hit.saison}
        <br />
        <b>Date:</b> {props.hit.date}
        <br />
        <b>Jour:</b> {props.hit.jour}
        <br />
        <Divider />
        <b>Livres:</b> {props.hit.livres}
        <br />
        <b>Sols:</b> {props.hit.sols}
        <br />
      </div>
    </span>
  );
};

export default ResultCard;
