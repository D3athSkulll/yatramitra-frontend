document.addEventListener('DOMContentLoaded', function() {
    const departure = JSON.parse(localStorage.getItem('departure-flight'));
    console.log(departure);
    var fare = parseInt(departure.flightPrice);
    const arrival = JSON.parse(localStorage.getItem('arrival-flight')) || null;
    var tripSummary = "<h2> Trip Summary </h2><p> Flight Summary </p>";
    if (departure) {
        tripSummary += "<p> Departing: <strong>" + departure.flightAirline + "</strong></p>";
        tripSummary += "<p>" + departure.origin + " -> " + departure.destination + "</p>";
        tripSummary += "<p> Flight " + departure.flightAirline + " | " + departure.flightTimes + " | Non-Stop </p>";
        tripSummary += "<p> Check-in: <strong> BAG | Handbag up to 7KG </strong></p>";

    }
    if (arrival){
        fare += parseInt(arrival.flightPrice);
        tripSummary += "<p> Arriving: <strong>" + arrival.flightAirline + "</strong></p>";
        tripSummary += "<p>" + departure.destination + " -> " + departure.origin + "</p>";
        tripSummary += "<p> Flight " + arrival.flightAirline + " | " + arrival.flightTimes + " | Non-Stop </p>";
        tripSummary += "<p> Check-in: <strong> BAG | Handbag up to 7KG </strong></p>";
    }
    tripSummary += "<p> Total Fare: ₹" + fare + "</p>";
    localStorage.setItem('fare', fare);
    document.getElementById('trip-summary').innerHTML = tripSummary;
    const passengersDiv = document.getElementById('passenger-details');
    const passengers = parseInt(departure.adults);
    for (var i = 0; i < passengers; i++) {
        const passengerDiv = document.createElement('div');
        passengerDiv.classList.add('passenger');
        const ht = `
                <label>Adult ${i + 1} </label>
                <div class='radio-group'>
                    <input type='radio' id='male' name='gender ${i}' value='male'>
                    <label for='male'>Male</label>
                    <input type='radio' id='female' name='gender ${i}' value='female'>
                    <label for='female'>Female</label>
                </div>
                
                <div class='form-group'>
                    <label for='fullName'>Name (As per government ID)</label>
                    <input type='text' id='fullName' name='fullName' placeholder='First and Middle Name'>
                    <input type='text' id='lastName' name='lastName' placeholder='Last Name'>
                </div>
                <div class='form-group'>
                    <label for='dob'>Age</label>
                    <input type='number' id='age' name='dob'>
                </div>
              `
        
        passengerDiv.innerHTML = ht;
        passengersDiv.appendChild(passengerDiv);
    }
});
document.getElementById('passenger-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const passengersDiv = document.getElementById('passenger-details');
    const passengers = passengersDiv.getElementsByClassName('passenger');
    const passengerDetails = [];
    for (var i = 0; i < passengers.length; i++) {
        const passenger = passengers
            .item(i)
            .getElementsByTagName('input');
        if (!passenger.fullName.value || !passenger.lastName.value || !passenger.age.value || !passenger[`gender ${i}`].value) {
                alert('Please fill in all the required fields for each passenger.');
                return;
        }
        const ob = {
            name: passenger.fullName.value +" " + passenger.lastName.value,
            age: passenger.age.value,
            gender: passenger[`gender ${i}`].value
        }
        passengerDetails.push(ob);
    }
    const departureFlight = JSON.parse(localStorage.getItem('departure-flight'));
    const arrivalFlight = JSON.parse(localStorage.getItem('arrival-flight')) || null;
    console.log(departureFlight);
    const formData = {
        type: 'flight',
        passengers: passengerDetails,
        departure: departureFlight.date,
        arrival: arrivalFlight || null,
        price: parseInt(localStorage.getItem('fare'))*100,
        source: departureFlight.origin,
        destination: departureFlight.destination,
        flightID: departureFlight.flightAirline,
        departureTime: departureFlight.flightTimes,
        arrivalTime: departureFlight.flightTimes || null,
    }
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/payment/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`        },
        body: JSON.stringify(formData),
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = './pay.html?paymentID='+data.clientSecret;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
