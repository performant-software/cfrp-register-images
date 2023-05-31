import React from 'react';
import {
  InstantSearch,
  ClearRefinements,
  Configure,
  CurrentRefinements,
  Hits,
  Pagination,
  Stats
} from 'react-instantsearch-hooks-web';
import { Accordion, Segment } from 'semantic-ui-react';
import RefinementListAccordion from './Components/RefinementListAccordion';
import CustomRangeSlider from './Components/CustomRangeSlider';
import ResultCard from './Components/ResultCard';
import locale from './locale';
import './App.css';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import CustomRefinementListAccordion from './Components/CustomRefinementListAccordion';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.REACT_APP_SEARCH_API_KEY, // Be sure to use the search-only-api-key
    nodes: [
      {
        host: process.env.REACT_APP_INDEX_HOST || 'localhost',
        port: parseInt(process.env.REACT_APP_INDEX_PORT || '8108', 10),
        protocol: process.env.REACT_APP_INDEX_PROTOCOL || 'http',
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    query_by: 'performance_date',
    sort_by: 'season_start_year:asc,_text_match:desc'
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const capitalize = string =>
  string ? string[0].toUpperCase() + string.slice(1) : string;

const jourFacetOrder = items => {
  const jourSorter = {
    Lundi: 0,
    Monday: 0,
    Mardi: 1,
    Tuesday: 1,
    Mercredi: 2,
    Wednesday: 2,
    Jeudi: 3,
    Thursday: 3,
    Vendredi: 4,
    Friday: 4,
    Samedi: 5,
    Saturday: 5,
    Dimanche: 6,
    Sunday: 6,
  };

  return items
    .sort((a, b) => jourSorter[a.label] - jourSorter[b.label])
    .map(item => ({
      ...item,
      label: capitalize(item.label),
    }));
};

const App = () => (
  <div>
    <div className="container">
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.REACT_APP_INDEX_NAME}
        routing={true}
      >
        <Configure
          filters=''
          hitsPerPage={20}
          routing={true}
        />

        <div className="search-panel">
          <div className="search-panel__filters panel">
            <CurrentRefinements
              // Optional parameters
              clearsQuery={true}
              transformItems={items => (items.map(i => ({ ...i, label: locale[i.attribute] })))}
            />
            <ClearRefinements
              // Optional parameters
              clearsQuery={true}
              translations={{
                resetButtonText: locale['clear_refinements']
              }}
            />
            <RefinementListAccordion
              attribute={'author_1'}
              searchable={true}
              showMore={true}
              title={locale['author_1']}
            />
            <RefinementListAccordion
              attribute={'author_2'}
              searchable={true}
              showMore={true}
              title={locale['author_2']}
            />
            <RefinementListAccordion
              attribute={'play_1'}
              searchable={true}
              showMore={true}
              title={locale['play_1']}
            />
            <RefinementListAccordion
              attribute={'play_2'}
              searchable={true}
              showMore={true}
              title={locale['play_2']}
            />
            <Accordion
              as={Segment}
              className="facet"
              defaultActiveIndex={[0]}
              panels={[
                {
                  key: 'season_start_year',
                  title: locale['season'],
                  content: {
                    content: (
                      <CustomRangeSlider
                        attribute="season_start_year"
                        defaultValues={{
                          min: 1680,
                          max: 1792,
                        }}
                        min={1680}
                        max={1792}
                        renderValue={(value) => `${value}-${value + 1}`}
                      />
                    ),
                  },
                },
              ]}
              exclusive={false}
              fluid
            />
            <RefinementListAccordion
              attribute={'nombre_d_actes_1'}
              facetOrder={'label'}
              searchable={false}
              showMore={true}
              title={locale['nombre_d_actes_1']}
            />
            <RefinementListAccordion
              attribute={'nombre_d_actes_2'}
              facetOrder={'label'}
              searchable={false}
              showMore={true}
              title={locale['nombre_d_actes_2']}
            />
            <RefinementListAccordion
              attribute={'jour'}
              facetOrder={jourFacetOrder}
              searchable={false}
              showMore={true}
              title={locale['jour']}
            />
            <CustomRefinementListAccordion
              attribute={'tier'}
              facetOrder={'label'}
              searchable={false}
              showMore={true}
              title={locale['livres']}
            />
            <Accordion
              as={Segment}
              className="facet"
              defaultActiveIndex={[0]}
              panels={[
                {
                  key: 'livres',
                  title: locale['livres'],
                  content: {
                    content: (
                      <CustomRangeSlider
                        attribute="livres"
                        defaultValues={{
                          min: 0,
                          max: 6696,
                        }}
                        min={0}
                        max={6696}
                      />
                    ),
                  },
                },
              ]}
              exclusive={false}
              fluid
            />
            <RefinementListAccordion
              attribute={'genre_1'}
              searchable={true}
              showMore={true}
              title={locale['genre_1']}
            />
            <RefinementListAccordion
              attribute={'genre_2'}
              searchable={true}
              showMore={true}
              title={locale['genre_2']}
            />
          </div>

          <div className="search-panel__results panel">
            <Stats
              translations={{
                stats({ nbHits, processingTimeMS }) {
                  return `${nbHits.toLocaleString()} resultats trouvés dans ${processingTimeMS.toLocaleString()}ms`
                }
              }}
            />
            <div className="pagination">
              <Pagination />
            </div>
            <Hits hitComponent={ResultCard} />
            <div className="pagination">
              <Pagination />
            </div>
            <Stats
              translations={{
                stats({ nbHits, processingTimeMS }) {
                  return `${nbHits.toLocaleString()} resultats trouvés dans ${processingTimeMS.toLocaleString()}ms`
                }
              }}
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  </div>
);

export default App;
