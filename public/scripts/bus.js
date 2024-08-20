function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
function convertTo12HourFormat(time24) {
    let [hours, minutes, seconds] = time24.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${hours}:${minutes} ${ampm}`;
}
const token = Cookies.get("token");
const departureBus = JSON.parse(Cookies.get("departure-bus"));
var departure = {};
var arrivalBus= {};
var fare = 0;
window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    loaderWrapper.classList.remove('hidden');
  });
document.addEventListener('DOMContentLoaded', async function() {
    const loaderContainer = document.getElementById('loader-wrapper');
    loaderContainer.classList.remove("hidden");
    const departureBusData = await fetch(`https://yatramitra-backend.onrender.com/api/bus/busData/${departureBus.ID}`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    departure = await departureBusData.json();
    departure.date = departureBus.departureDate;
    var fare = parseInt(departure.price);
    const arrival = JSON.parse(Cookies.get('arrival-bus') || "{}") || null;
    var tripSummary = "<h2> Trip Summary </h2><p> Bus Summary </p>";
    if (departure) {
        departure.flightTimes = convertTo12HourFormat(departure.departure_time) + " - " + convertTo12HourFormat(departure.arrival_time)
        tripSummary += "<p> Departing: <strong>" + departure.bus_number + "</strong></p>";
        tripSummary += "<p>" + departure.origin + " -> " + departure.destination + "</p>";
        tripSummary += "<p> Bus " + departure.bus_number + " | " + departure.flightTimes + " | Non-Stop </p>";

    }
    if (arrival.ID){
        const arrivalBusData = await fetch(`https://yatramitra-backend.onrender.com/api/bus/busData/${arrival.ID}`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        });
        arrivalBus = await arrivalBusData.json();
        arrivalBus.date = arrival.arrivalDate;
        fare += parseInt(arrivalBus.price);
        arrivalBus.flightTimes = convertTo12HourFormat(arrivalBus.departure_time) + " - " + convertTo12HourFormat(arrivalBus.arrival_time);
        tripSummary += "<p> Arriving: <strong>" + arrivalBus.bus_number + "</strong></p>";
        tripSummary += "<p>" + arrivalBus.destination + " -> " + arrivalBus.origin + "</p>";
        tripSummary += "<p> Bus " + arrivalBus.bus_number + " | " + arrivalBus.flightTimes + " | Non-Stop </p>";
    }
    const passengers = parseInt(departureBus.adults);
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
        type: 'bus',
        passengers: passengerDetails,
        departure: departure.date,
        arrival: arrivalBus.date || undefined,
        source: departure.origin,
        destination: departure.destination,
        departureID: departure.bus_number,
        arrivalID: arrivalBus.bus_number || undefined,
        departureTime: departure.flightTimes,
        arrivalTime: arrivalBus.flightTimes || undefined,
    }
    
    localStorage.removeItem('departure-bus');
    localStorage.removeItem('arrival-bus');
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
