# cfrp-rebuild

_This project was generated with [create-instantsearch-app](https://github.com/algolia/instantsearch.js/tree/master/packages/create-instantsearch-app) by [Algolia](https://algolia.com)._

## Get started

To run this project locally, install the dependencies and run the local server:

```sh
npm install
npm start
```

Alternatively, you may use [Yarn](https://http://yarnpkg.com/):

```sh
yarn
yarn start
```

Open http://localhost:3000 to see your app.

## Importing Data

Using the Typesense API, data can be imported with the following command:

```sh
node ./scripts/import.mjs /path/to/documents.jsonl
```

A JSONL file is required, as well as the following environment variables:

```javascript
REACT_APP_INDEX_HOST
REACT_APP_INDEX_NAME
REACT_APP_SEARCH_API_KEY
```
