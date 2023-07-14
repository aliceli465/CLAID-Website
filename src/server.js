const express = require('express');
const {MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.use(express.json());
//use POST method to go down the /checkin HTTP route
//req = request, res = response.
app.post('/checkin', async (req, res) => {
    const {name, email, event_code} = req.body;
    updateLeaderboard();
    try {
        await client.connect();
        //if event exists
        if(await checkEventExists(client, event_code)) {
            //if user already exists
            if(await checkUserExists(client, email)) {
                //if user has not checked in already
                if(!(await checkAlreadyCheckedIn(client, email, event_code))){
                    await updateUser(client, email, event_code);
                    await updateLeaderboard();
                }
            }
            //if user is new
            else{
                await createUser(client, name, email, event_code);
            }
            res.send("Check in was successful!");
       }
       else{
            res.send("Event code is invalid");
       }
    } catch(error) {
        res.send("Failure to connect to the database");
    }
});

/*

    SCHEMA

    user: {
        name:
        email:
        events: []
        points:
    }

    event: {
        event_code:
        points:
    }

*/
async function checkUserExists(client, email) {
    const collection = client.db('CLAID_DB').collection('users');
    const user = await collection.findOne({ email:email });
    if(user) {
        return true;
    }
    else{
        return false;
    }
}

async function checkEventExists(client, event_code) {
    const collection = client.db('CLAID_DB').collection('events');
    const event = await collection.findOne({ event_code:event_code });
    if(event) {
        return true;
    }
    else{
        return false;
    }
}

async function checkAlreadyCheckedIn(client, email, event_code) {
    const collection = client.db('CLAID_DB').collection('users');
    const user = await collection.findOne({ email: email, events: {$in: [event_code] } });
    if(user) {
        return true;
    }
    else{
        return false;
    }
}

async function createUser(client, name, email, event_code) {
    //find number of points to insert
    const points = getEventPoints(client, event_code);
    const newUser = {
        name: name,
        email: email,
        events: [event_code],
        points: points
    }
    client.db('CLAID_DB').collection('users').insertOne(newUser);
}

async function updateUser(client, email, event_code) {
    const points_to_add = getEventPoints(client, event_code);
    client.db('CLAID_DB').collection('users').updateOne(
        { email: email },
        { 
            $inc: {points, points_to_add}, 
            $push: {events: event_code}
        }
    );
}

async function getEventPoints(client, event_code) {
    const event = await client.db('CLAID_DB').collection('events').findOne({ event_code : event_code});
    if(event) {
        return event.points;
    }
    else{
        return 0;
    }
}

async function updateLeaderboard(client) {
    const collection = client.db('CLAID_DB').collection('users');
    db.collection.find().sort({points:-1}).limit(3)
    .toArray((err, topUsers) => {
        if(err) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            cell1.textContent = "No users yet!";
            const cell2 = document.createElement('td');
            cell2.textContent = "No points submitted yet!";
            row.appendChild(cell1);
            row.appendChild(cell2);
            table.appendChild(row);
        }
        const leaderboard = document.getElementById("points-table");

        topUsers.forEach(user => {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            cell1.textContent = user.name;
            const cell2 = document.createElement('td');
            cell2.textContent = user.points;
            row.appendChild(cell1);
            row.appendChild(cell2);
            table.appendChild(row);
        });
        client.close();
    });
}