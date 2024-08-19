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
const departureTrain = JSON.parse(Cookies.get("departure-train"));
var fare = 0;
document.addEventListener('DOMContentLoaded', async function() {

    var fare = parseInt(departureTrain.trainPrice);
    var tripSummary = "<h2> Trip Summary </h2><p> Train Summary </p>";
    if (departureTrain) {
        tripSummary += "<p> Departing: <strong>" + departureTrain.trainName + "</strong></p>";
        tripSummary += "<p>" + departureTrain.origin + " -> " + departureTrain.destination + "</p>";
        tripSummary += "<p> Train " + departureTrain.trainNumber + " | " + departureTrain.trainDuration + " </p>";
    }
    const passengers = parseInt(departureTrain.seats);
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
        type: 'train',
        passengers: passengerDetails,
        departure: departureTrain.departureDate,
        source: departureTrain.origin,
        destination: departureTrain.destination,
        departureID: departureTrain.trainNumber,
        departureTime: departureTrain.trainDuration,
    }
    
    localStorage.removeItem('departure-train');
    const token = Cookies.get('token');
    fetch('https://yatramitra-backend.onrender.com/payment/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`},
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
