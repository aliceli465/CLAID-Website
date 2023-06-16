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
    const collection = client.db('DB_NAME').collection('TABLE_NAME');
    const user = await collection.findOne({ email:email });
    if(user) {
        return true;
    }
    else{
        return false;
    }
}

async function checkEventExists(client, event_code) {
    const collection = client.db('DB_NAME').collection('TABLE_NAME');
    const event = await collection.findOne({ event_code:event_code });
    if(event) {
        return true;
    }
    else{
        return false;
    }
}

async function checkAlreadyCheckedIn(client, email, event_code) {
    const collection = client.db('DB_NAME').collection('TABLE_NAME');
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
    client.db('DB_NAME').collection('TABLE_NAME').insertOne(newUser);
}

async function updateUser(client, email, event_code) {
    const points_to_add = getEventPoints(client, event_code);
    client.db('DB_NAME').collection('TABLE_NAME').updateOne(
        { email: email },
        { 
            $inc: {points, points_to_add}, 
            $push: {events: event_code}
        }
    );
}

async function getEventPoints(client, event_code) {
    const event = await client.db('DB_NAME').collection('TABLE_NAME').findOne({ event_code : event_code});
    if(event) {
        return event.points;
    }
    else{
        return 0;
    }
}

function main() {
    //PROCESS THE FORM HERE
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = new FormData(form);
        const name = data.get('name');
        const email = data.get('email');
        const event_code = data.get('eventcode');

        //MONGODB STUFF HERE
        const { MongoClient } = require('mongodb');
        require('dotenv').config();
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri);

        /*
        if(event code in codes table):
        if(registered):
                    if(user.eventsattended does not contain event code):
                            find user in user table, update points
            else:
                    add new user with x points, and add event name to events attended
        else:
            html pop up that says event code is invalid
        */
       if(checkEventExists(client, event_code)) {
            //if user already exists
            if(checkUserExists(client, email)) {
                //if user has not checked in already
                if(!checkAlreadyCheckedIn(client, email, event_code)){
                    updateUser(client, email, event_code);
                }
            }
            //if user is new
            else{
                createUser(client, name, email, event_code);
            }
       }
       else{
            //return javascript pop up that event code is invalid
       }

    });
}

document.addEventListener('DOMContentLoaded', main);
