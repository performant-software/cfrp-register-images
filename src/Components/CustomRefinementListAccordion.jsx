import React from 'react';
import { Accordion, Segment } from 'semantic-ui-react';
import locale from '../locale';
import CustomRefinementList from './CustomRefinementList';

const capitalize = string =>
  string ? string[0].toUpperCase() + string.slice(1) : string;

const CustomRefinementListAccordion = props => {
  const { attribute, facetOrder, searchable, showMore, title, labelTransform } = props;

  const sortTransform = items => {
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

  //if a label transform was passed in, apply it after the sort transform
  const transformation = items => {
    return (
      labelTransform ? labelTransform(sortTransform(items)) : sortTransform(items)
    );
  }

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
              <CustomRefinementList
                attribute={attribute}
                searchable={searchable}
                showMore={showMore}
                showMoreLimit={100}
                transformItems={items => transformation(items)}
                translations={{
                  showMoreButtonText({ isShowingMore }) {
                    return isShowingMore ? locale['show_less'] : locale['show_more'];
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

export default CustomRefinementListAccordion;