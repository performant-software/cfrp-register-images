import React from 'react';
import {
  RefinementList
} from 'react-instantsearch-dom';
import {
  Accordion,
  Segment
} from 'semantic-ui-react';

const capitalize = (string) => (
  string ? string[0].toUpperCase() + string.slice(1) : string
);

const RefinementListAccordion = (props) => {
  const {
    attribute,
    searchable,
    showMore,
    title
  } = props;

  return (
    <Accordion
      as={Segment}
      className="facet"
      defaultActiveIndex={[0]}
      panels={[
        {
          key: attribute,
          title: title,
          content: {
            content: (
              <RefinementList
                attribute={attribute}
                searchable={searchable}
                showMore={showMore}
                transformItems={items =>
                 items.map(item => ({
                   ...item,
                   label: capitalize(item.label)
                 }))
               }
                translations={
                  searchable ? { placeholder: "Cherche ici..." } : {}
                }
              />
            )
          }
        }
      ]}
      exclusive={false}
      fluid
    />
  );
};

export default RefinementListAccordion;
