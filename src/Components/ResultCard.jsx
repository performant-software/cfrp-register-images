import React, { useMemo, useState } from 'react';
import { Divider, Icon } from 'semantic-ui-react';
import locale from '../locale';

import RecetteModal from './RecetteModal';

const splitPlays = (hit) => {
  const plays = [];

  for (let i = 1; i < 5; i++) {
    if (hit[`play_${i}`]) {
      plays.push({
        title: hit[`play_${i}`],
        author: hit[`author_${i}`].join(', '),
        genre: hit[`genre_${i}`],
        actCount: hit[`nombre_d_actes_${i}`]
      })
    }
  }

  return plays;
}

const styles = {
  top_data: {
    display: 'flex',
    width: '100%',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  play_cards_container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  play_card: {
    background: '#f2f4f4',
    padding: 10,
    borderRadius: 5,
    lineHeight: 1.5,
    width: '100%'
  }
}

const capitalize = string =>
  string ? string[0].toUpperCase() + string.slice(1) : string;

const ResultCard = props => {
  const [modalOpen, setModalOpen] = useState(false);

  const plays = useMemo(() => splitPlays(props.hit), [props.hit]);

  return (
    <div
      style={{ width: '100%' }}
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

      <div style={styles.top_data}>
        <span style={{ display: 'flex' }}><b>{locale['season']}:&nbsp;</b> {props.hit.season_start_year} - {props.hit.season_end_year}</span>
        <br />
        <span style={{ display: 'flex' }}><b>{locale['performance_date']}:&nbsp;</b> {props.hit.performance_date}</span>
        <br />
        <span style={{ display: 'flex' }}><b>{locale['jour']}:&nbsp;</b> {props.hit.jour}</span>
        <br />
        <span style={{ display: 'flex' }}><b>{locale['total_revenue']}:&nbsp;</b> {props.hit.total_revenue}</span>
      </div>

      <Divider />

      <div style={styles.play_cards_container}>
        {plays.map((p, index) => (
          <div key={index} style={{ display: 'flex', gap: 10 }}>
            <p>{index + 1}.</p>
            <div style={styles.play_card}>
              <b>{locale['author']}:</b> {p.author}
              <br />
              <b>{locale['title']}:</b> {p.title}
              <br />
              <b>{locale['genre']}:</b> {capitalize(p.genre)}
              <br />
              <b>{locale['nombre_d_actes']}:</b> {p.actCount}
              <br />
            </div>
          </div>
        ))}
      </div>



      <div style={{ width: '100%', textAlign: 'center', paddingTop: '16px' }}>
        <Icon name='camera' size='large' />
      </div>
    </div>
  );
};

export default ResultCard;
