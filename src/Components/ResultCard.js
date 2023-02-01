import React from 'react';
import {
  Divider
} from 'semantic-ui-react';

const capitalize = (string) => (
  string ? string[0].toUpperCase() + string.slice(1) : string
);

const ResultCard = (props) => {
  return (
    <>
      <div style={{width: "50%"}}>
        <b>Register ID:</b> {props.hit.register_id}
        <br />
        <b>Play ID:</b> {props.hit.play_id}
        <br />
        <Divider />
        <b>Titre:</b> {props.hit.titre}
        <br />
        <b>Genre:</b> {capitalize(props.hit.genre)}
        <br />
        <b>Actes:</b> {props.hit.actes}
        <br />
        <b>Ordre:</b> {props.hit.ordre}
        <br />
        <Divider />
        <b>Nom D'Auteur:</b> {props.hit.nom_dauteur}
        <br />
        <b>Personne ID:</b> {props.hit.personne_id}
        <br />
      </div>

      <div style={{width: "50%", marginLeft: "25px"}}>
        <b>Saison:</b> {props.hit.saison}
        <br />
        <b>Date:</b> {props.hit.date}
        <br />
        <b>Jour:</b> {props.hit.jour}
        <br />
        <Divider />
        <b>Livres:</b> {props.hit.livres}
        <br />
        <b>Sous:</b> {props.hit.sous}
        <br />
      </div>

    </>
  );
};

export default ResultCard;
