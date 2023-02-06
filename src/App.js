import React from 'react';
import {
  InstantSearch,
  ClearRefinements,
  Configure,
  CurrentRefinements,
  Hits,
  Pagination,
  RefinementList
} from 'react-instantsearch-dom';
import {
  Accordion,
  Divider,
  Icon,
  Segment
} from 'semantic-ui-react';
import RefinementListAccordion from './Components/RefinementListAccordion';
import CustomRangeSlider from './Components/CustomRangeSlider';
import ResultCard from './Components/ResultCard';
import 'instantsearch.css/themes/satellite.css';
import './App.css';

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: "date"
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const capitalize = (string) => (
  string ? string[0].toUpperCase() + string.slice(1) : string
);

const jourFacetOrder = (items) => {
  const jourSorter = {
    'Lundi': 0,
    'Monday': 0,
    'Mardi': 1,
    'Tuesday': 1,
    'Mercredi': 2,
    'Wednesday': 2,
    'Jeudi': 3,
    'Thursday': 3,
    'Vendredi': 4,
    'Friday': 4,
    'Samedi': 5,
    'Saturday': 5,
    'Dimanche': 6,
    'Sunday': 6
  };

  return items.sort((a, b) => {
    return jourSorter[a.label] - jourSorter[b.label];
    })
  .map(item => ({
    ...item,
    label: capitalize(item.label)
  }))
}

const saisonFacetOrder = (items) => {
  return items.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
  .map(item => ({
    ...item,
    label: item.label
  }))
}

function App() {
  return (
    <div>
      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="recettes">
          <Configure hitsPerPage={20} />

          <div className="search-panel">
            <div className="search-panel__filters panel">
              <CurrentRefinements
                // Optional parameters
                clearsQuery={true}
              />
              <ClearRefinements
                // Optional parameters
                clearsQuery={true}
              />
              <RefinementListAccordion
                attribute={"actes"}
                facetOrder={"label"}
                searchable={false}
                showMore={true}
                title={"Actes"}
              />
              <RefinementListAccordion
                attribute={"genre"}
                searchable={true}
                showMore={true}
                title={"Genre"}
              />
              <RefinementListAccordion
                attribute={"jour"}
                facetOrder={jourFacetOrder}
                searchable={false}
                showMore={true}
                title={"Jour"}
              />
              <RefinementListAccordion
                attribute={"ordre"}
                facetOrder={"label"}
                searchable={false}
                showMore={false}
                title={"Ordre"}
              />
              <RefinementListAccordion
                attribute={"saison"}
                facetOrder={saisonFacetOrder}
                searchable={true}
                showMore={true}
                title={"Saison"}
              />
              <Accordion
                as={Segment}
                className="facet"
                defaultActiveIndex={[0]}
                panels={[
                  {
                    key: "livres",
                    title: "Livres",
                    content: {
                      content: (
                        <CustomRangeSlider
                          attribute='livres'
                          defaultValues={{
                              min: 0,
                              max: 6696
                          }}
                        />
                      )
                    }
                  }
                ]}
                exclusive={false}
                fluid
              />
              <RefinementListAccordion
                attribute={"nom_dauteur"}
                searchable={true}
                showMore={true}
                title={"Nom D'Auteur"}
              />
              <RefinementListAccordion
                attribute={"titre"}
                searchable={true}
                showMore={true}
                title={"Titre"}
              />
            </div>

            <div className="search-panel__results panel" >
              <div className="pagination">
                <Pagination />
              </div>
              <Hits hitComponent={ResultCard} />
              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default App;
