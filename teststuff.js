const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://claiduiuc:claid2023@claidcluster.k95dxwu.mongodb.net/?retryWrites=true&w=majority";

const { checkUserExists, checkEventExists, checkAlreadyCheckedIn, createUser, updateUser, getEventPoints } = require('./src/helpers.js');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log("------------------------------------");
    let c1 = await checkUserExists(client, "nameal1234@gmail.com");
    let c2 = await checkEventExists(client, "tangyuan");
    let c3 = await checkAlreadyCheckedIn(client, "nameal1234@gmail.com", "tangyuan");
    console.log("Does user exist? " + c1 + ", does event exist? " + c2 + " Has already checked in? " + c3);
    console.log("------------------------------------");
    await updateUser(client, "nameal1234@gmail.com", "tangyuan");
    console.log("Attempted to update user. Check the DB!");
    console.log("------------------------------------");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
