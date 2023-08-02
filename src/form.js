function main() {
    //PROCESS THE FORM HERE
    const form = document.querySelector('#check_in');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = new FormData(form);
        const name = data.get('name');
        const email = data.get('email');
        const event_code = data.get('eventcode');

        //make an HTTP POST request
        fetch('/checkin', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: data
        })
        .then(response => response.text())
        .then(result => {
            if(result === "success") {
                //success
                alert("Check in was successful! (˶ᵔ ᵕ ᵔ˶) ");
            }
            else if(result === "already checked in") {
                alert("You have already checked into this event!");
            }
            else if(result === "invalid event code"){
                alert("Invalid event code!");
            }
            else {
                alert("Could not connect to database :(");
            }
        })
        .catch(error => {
            //handle error
            alert("Something went wrong on our end!");
        });
    });
}

document.addEventListener('DOMContentLoaded', main);
