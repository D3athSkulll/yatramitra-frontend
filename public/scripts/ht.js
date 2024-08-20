function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    loaderWrapper.classList.remove('hidden');
  });
function convertTo12HourFormat(time24) {
    let [hours, minutes, seconds] = time24.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${hours}:${minutes} ${ampm}`;
}
const token = Cookies.get("token");
const departureFlight = JSON.parse(Cookies.get("departure-flight"));
var departure = {};
var arrivalFlight= {};
var fare = 0;
document.addEventListener('DOMContentLoaded', async function() {
    const loaderContainer = document.getElementById('loader-wrapper');
    loaderContainer.classList.remove("hidden");
    const departureFlightData = await fetch(`https://yatramitra-backend.onrender.com/api/flight/flightData/${departureFlight.ID}`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    console.log(departureFlightData)
    departure = await departureFlightData.json();
    departure.date = departureFlight.departureDate;
    var fare = parseInt(departure.price);
    const arrival = JSON.parse(Cookies.get('arrival-flight') || "{}") || null;
    var tripSummary = "<h2> Trip Summary </h2><p> Flight Summary </p>";
    if (departure) {
        departure.flightTimes = convertTo12HourFormat(departure.departure_time) + " - " + convertTo12HourFormat(departure.arrival_time)
        tripSummary += "<p> Departing: <strong>" + departure.flight_number + "</strong></p>";
        tripSummary += "<p>" + departure.origin + " -> " + departure.destination + "</p>";
        tripSummary += "<p> Flight " + departure.flight_number + " | " + departure.flightTimes + " | Non-Stop </p>";
        tripSummary += "<p> Check-in: <strong> BAG | Handbag up to 7KG </strong></p><br>";

    }
    if (arrival.ID){
        const arrivalFlightData = await fetch(`https://yatramitra-backend.onrender.com/api/flight/flightData/${arrival.ID}`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        });
        arrivalFlight = await arrivalFlightData.json();
        arrivalFlight.date = arrival.arrivalDate;
        fare += parseInt(arrivalFlight.price);
        arrivalFlight.flightTimes = convertTo12HourFormat(arrivalFlight.departure_time) + " - " + convertTo12HourFormat(arrivalFlight.arrival_time);
        tripSummary += "<p> Arriving: <strong>" + arrivalFlight.flight_number + "</strong></p>";
        tripSummary += "<p>" + arrivalFlight.destination + " -> " + arrivalFlight.origin + "</p>";
        tripSummary += "<p> Flight " + arrivalFlight.flight_number + " | " + arrivalFlight.flightTimes + " | Non-Stop </p>";
        tripSummary += "<p> Check-in: <strong> BAG | Handbag up to 7KG </strong></p><br>";
    }

    const passengers = parseInt(departureFlight.adults);
    console.log(passengers);
    fare = fare * passengers;
    tripSummary += "<p> Total Fare: <strong>₹" + fare + "</strong></p>";
    Cookies.set('fare', fare);
    document.getElementById('trip-summary').innerHTML = tripSummary;
    const passengersDiv = document.getElementById('passenger-details');
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
                
                    <label for='fullName'>Name (As per government ID)</label>
                    <input type='text' id='fullName' name='fullName' placeholder='First and Middle Name'>
                    <input type='text' id='lastName' name='lastName' placeholder='Last Name'>
            
                    <label for='dob'>Age</label>
                    <input type='number' id='age' name='dob'>
              `
        
        passengerDiv.innerHTML = ht;
        passengersDiv.appendChild(passengerDiv);
    }
    loaderContainer.classList.add("hidden");

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
    const formData = {
        type: 'flight',
        passengers: passengerDetails,
        departure: departure.date,
        arrival: arrivalFlight.date || undefined,
        source: departure.origin,
        destination: departure.destination,
        departureID: departure.flight_number,
        arrivalID: arrivalFlight.flight_number || undefined,
        departureTime: departure.flightTimes,
        arrivalTime: arrivalFlight.flightTimes || undefined,
    }
    
    localStorage.removeItem('departure-flight');
    localStorage.removeItem('arrival-flight');
    const token = Cookies.get('token');
    fetch('https://yatramitra-backend.onrender.com/payment/save', {
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
