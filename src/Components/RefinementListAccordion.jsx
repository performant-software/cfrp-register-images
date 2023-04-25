import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';
import { Accordion, Segment } from 'semantic-ui-react';

const capitalize = string =>
  string ? string[0].toUpperCase() + string.slice(1) : string;

const RefinementListAccordion = props => {
  const { attribute, facetOrder, searchable, showMore, title } = props;

  const transformation = items => {
    if (!facetOrder) {
      return items.map(item => ({
        ...item,
        label: capitalize(item.label),
      }));
    } else if (facetOrder === 'label') {
      return items
        .sort((a, b) => a.label - b.label)
        .map(item => ({
          ...item,
          label: capitalize(item.label),
        }));
    } else if (facetOrder === 'label:desc') {
      return items
        .sort((a, b) => b.label - a.label)
        .map(item => ({
          ...item,
          label: capitalize(item.label),
        }));
    } else {
      return facetOrder(items);
      // can pass in custom sorting function
    }
  };

  return (
    <Accordion
      as={Segment}
      className="facet"
      defaultActiveIndex={[0]}
      panels={[
        {
          key: attribute,
          title,
          content: {
            content: (
              <RefinementList
                attribute={attribute}
                searchable={searchable}
                showMore={showMore}
                showMoreLimit={100}
                transformItems={items => transformation(items)}
                translations={{
                  showMore(expanded) {
                    return expanded ? 'Montrer moins' : 'Montre plus';
                  },
                  noResults: 'No results',
                  placeholder: 'Cherche ici...',
                }}
              />
            ),
          },
        },
      ]}
      exclusive={false}
      fluid
    />
  );
};

export default RefinementListAccordion;
