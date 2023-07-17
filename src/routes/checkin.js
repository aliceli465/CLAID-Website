const express = require('express');
const router = express.Router();

const { checkUserExists, checkEventExists, checkAlreadyCheckedIn, createUser, updateUser, getEventPoints } = require('../helpers');

router.post('/', async (req, res) => {
    try {
        const { name, email, event_code } = req.body;

        const userExists = await checkUserExists(client, email);
        const eventExists = await checkEventExists(client, event_code);
        const alreadyCheckedIn = await checkAlreadyCheckedIn(client, email, event_code);

        if(eventExists) {
            if(userExists) {
                if(!alreadyCheckedIn) {
                    await updateUser(client, email, event_code);
                    //update leader board here
                }
            }
            else{
                await createUser(client, name, email, event_code);
            }
            res.send("success")
        }
        else{
            res.send("invalid");
        }
    } catch (error) {
        res.send("failure")
    }
});

module.exports = router;