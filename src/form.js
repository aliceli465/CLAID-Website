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

(async function() {
    const { MongoClient } = require('mongodb');
    require('dotenv').config();
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        function main() {
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
                alert("Check in was successful!");
                location.reload();
           }
           else{
                //return javascript pop up that event code is invalid
                alert("Event code is invalid");
                location.reload();
           }
        }
        document.addEventListener('DOMContentLoaded', main);
    } catch (error) {
        alert("Couldn't connect to database :(");
    }
    client.close();
})();


// function main() {
//     //PROCESS THE FORM HERE
//     const form = document.querySelector('#check_in');
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const data = new FormData(form);
//         const name = data.get('name');
//         const email = data.get('email');
//         const event_code = data.get('eventcode');

//         //MONGODB STUFF HERE
//         try {
//             const { MongoClient } = require('mongodb');
//             require('dotenv').config();
//             const uri = process.env.MONGODB_URI;
//             const client = new MongoClient(uri);
//            if(checkEventExists(client, event_code)) {
//                 //if user already exists
//                 if(checkUserExists(client, email)) {
//                     //if user has not checked in already
//                     if(!checkAlreadyCheckedIn(client, email, event_code)){
//                         updateUser(client, email, event_code);
//                     }
//                 }
//                 //if user is new
//                 else{
//                     createUser(client, name, email, event_code);
//                 }
//                 alert("Check in was successful!");
//                 location.reload();
//            }
//            else{
//                 //return javascript pop up that event code is invalid
//                 alert("Event code is invalid");
//                 location.reload();
//            }
//         }
//         finally {
//             alert("Failure to connect to database");
//             client.close();
//         }

//         form.reset
//     });
// }

// document.addEventListener('DOMContentLoaded', main);
