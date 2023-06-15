const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        //find database
        const db = client.db('sample_airbnb');
        //find table/collection
        const collection = db.collection('listingsAndReviews');
        //find first document in the collection (aka, row/record)
        const first = await collection.findOne();
        //log it to console
        console.log(first);
    } finally {
        await client.close();
    }
}

run().catch(console.error);

/**
 * MongoDB in node.js summary
 * 
 * CRUD = create, read, update, delete
 * 
 * you don't need a set schema when you insert a document! mongo will automatically determine the structure for you
 * 
 * 
 * 
 *  * SEEING IF A USER EXISTS
 * async function checkUserExists(client, email) {
 *      const collection = client.db('DB_NAME').collection('TABLE_NAME');
 *      const user = await collection.findOne({ email:email });
 *      if(user) {
 *          return true;
 *      }
 *      else{
 *          return false;
 *      }
 * }
 * ----------------------------------------------------------------------------------------------
 * SEEING IF A USER EXISTS
 * async function checkUserExists(client, email) {
 *      const collection = client.db('DB_NAME').collection('TABLE_NAME');
 *      const user = await collection.findOne({ email:email });
 *      if(user) {
 *          return true;
 *      }
 *      else{
 *          return false;
 *      }
 * }
 * ----------------------------------------------------------------------------------------------
 * SEEING IF A USER HAS ALREADY CHECKED INTO THIS EVENT BEFORE
 * 
 * async function checkAlreadyCheckedIn(client, email, event_code) {
 *      const collection = client.db('DB_NAME').collection('TABLE_NAME');
 *      const user = await collection.findOne({ email: email, events: {$in: [event_code] } });
 *      if(user) {
 *          return true;
 *      }
 *      else{
 *          return false;
 *      }
 * }
 * ----------------------------------------------------------------------------------------------
 * INSERTING A NEW USER
 * async function createUser(client, newUser) {
 *      const result = await client.db('DB_NAME').collection('TABLE_NAME').insertOne(newUser);
 *      console.log('New listing created with with the following id: ${result.insertID}');
 *  
 * }
 * 
 * you can call this as:
 * await createListing(client,
 *      {
 *          name: "Alice Li",
 *          email: "alice@gmail.com",
 *          events: ["eventcode1"],
 *          points: 1
 *      }
 * );
 * ----------------------------------------------------------------------------------------------
 * UPDATING A USER
 * 
 * updateOne(filter, update) function has two parameters. filter finds the object, and update calls operations
 * if we're updating points, call the $inc function
 * if we're adding event code to array, use $push
 * 
 * 
 * async function updatePoints(client, email, points_to_add, event_code) {
 *      const result = await client.db('DB_NAME').collection('TABLE_NAME').updateOne(
 *          { email: email },
 *          { 
 *              $inc: {points, points_to_add}, 
 *              $push: {events: event_code}
 *          }
 *      );
 *      console.log('Points added successfully');
 * }
 * ----------------------------------------------------------------------------------------------
 * INSERTING A NEW EVENT CODE
 * 
 * async function createUser(client, event_code) {
 *      const result = await client.db('DB_NAME').collection('TABLE_NAME').insertOne(event_code);
 *      console.log('New listing created with with the following id: ${result.insertID}');
 * }
 * ----------------------------------------------------------------------------------------------
 * 
 * n
 * a
 * s
 * 
 * Student(name, age, school) : n(a), a(age), s(school)
 * 
 * 
 * n = name
 */