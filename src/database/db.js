const { MongoClient } = require('mongodb');
const { connection } = require('mongoose');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://akinsuyitaiwod:Temidayo1@cluster0.r4et878.mongodb.net/EVENT-HANDLER"';
const client = new MongoClient(url);

// Database Name
const dbName = 'event-handler';

async function connect() {
    await client.connect();
    const db = await client.db(dbName);
    return db;
}

module.exports = connection;