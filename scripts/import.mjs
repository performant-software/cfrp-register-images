import * as dotenv from 'dotenv';
import fs from 'fs';
import Typesense from 'typesense';
import schema from './schema.json' assert { type: 'json' };

// Configure environment variables
dotenv.config();

/**
 * Logs the passed message with padding.
 *
 * @param message
 */
const log = (message) => {
  console.log('');
  console.log(message);
  console.log('');
};

/**
 * Runs the import process.
 *
 * @returns {Promise<void>}
 */
const run = async () => {
  const filepath = process.argv[2];

  if (!filepath) {
    log('File path is required');
    process.exit(1);
  }

  const client = new Typesense.Client({
    nodes: [{
      host: process.env.REACT_APP_INDEX_HOST,
      port: parseInt(process.env.REACT_APP_INDEX_PORT || '8108'),
      protocol: process.env.REACT_APP_INDEX_PROTOCOL || 'http'
    }],
    apiKey: process.env.REACT_APP_SEARCH_API_KEY,
    numRetries: parseInt(process.env.REACT_APP_SEARCH_RETRIES || '3'),
    connectionTimeoutSeconds: parseInt(process.env.REACT_APP_SEARCH_TIMEOUT || '5000'),
    logLevel: 'debug'
  });

  log('Removing exising collections...');

  const collections = await client.collections().retrieve();

  for (let i = 0; i < collections.length; i+= 1) {
    const collection = collections[i];
    await client.collections(collection.name).delete();
  }

  const indexName = process.env.REACT_APP_INDEX_NAME;
  log(`Creating collection '${indexName}'...`);

  await client
    .collections()
    .create({
      ...schema,
      name: indexName
    });

  const data = await fs.readFileSync(filepath);

  log('Importing data...');

  await client
    .collections(indexName)
    .documents()
    .import(data, { action: 'create' });
};

await run();
