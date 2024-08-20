window.addEventListener('load', function() {
  const loaderWrapper = document.getElementById('loader-wrapper');
  loaderWrapper.classList.add('hidden');
  console.log(loaderWrapper.classList);
  console.log("Loaded");
});
function getCookie(name) {
  const value = `; ${document.cookie}`;
  console.log(value);
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function calculateTime(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
}
function calculateTravelTime(ms){
    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hr ${minutes} min`;
}
var depDate;
var aDate;
const token = Cookies.get("token");
document.addEventListener('DOMContentLoaded', () => {
  const formData = JSON.parse(Cookies.get('formData') || "{}");
  console.log(formData)
  if (formData.origin) {
    document.getElementById('from').value = formData.origin;
    document.getElementById('to').value = formData.destination;
    document.getElementById('depart-date').value = formData.departureDate;
    document.getElementById('adults').value = formData.adults;
    document.getElementById("trip-type").value = "One Way";

    if (formData.arrival) {
      document.getElementById("trip-type").value = "Round Trip";
      document.getElementById('return-date').disabled = false;
      document.getElementById('return-date').value = formData.arrival;
    }
    Cookies.remove('formData');

    document.getElementById('searchButton').click();
    
  }
});



document.getElementById('depart-date').addEventListener('change', (event) => {
  document.getElementById('return-date').setAttribute("min", document.getElementById('depart-date').value);
})
const selectElement = document.getElementById('trip-type');
selectElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if (value === 'Round Trip') {
      document.querySelector("#return-date").disabled = false;
        document.querySelector("#return-date").type="date";
      }
   else {
    document.querySelector("#return-date").disabled = true;
    document.querySelector("#return-date").type="text";
    document.querySelector("#return-date").value = "SELECT ROUND TRIP";
    }
});
const apiUrl = "https://yatramitra-backend.onrender.com/"
const fromSearch = document.getElementById('from');
fromSearch.addEventListener('input', async (event) => {
    const suggestionsContainer = document.getElementById('suggestions');

    const origin = event.target.value;
    if(!origin || origin==""){
        suggestionsContainer.style.display = 'none';
        return;
    }
    suggestionsContainer.style.display = 'block';
    try {
      const response = await fetch(apiUrl+`api/flight/autocomplete?query=${origin}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        suggestionsContainer.innerHTML = '';

        data.forEach(el => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = `${el.city}, ${el.name} (${el.iata_code})`;
            suggestionItem.addEventListener('click', () => {
                fromSearch.value = el.iata_code;
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.style.display='none';
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
  const toSearch = document.getElementById('to');
  toSearch.addEventListener('input', async (event) => {
    const origin = event.target.value;
    const suggestionsContainer = document.getElementById('suggestions2');
    if(!origin|| origin==""){
        suggestionsContainer.style.display = 'none';
        return;
    }
    suggestionsContainer.style.display = 'block';
    try {
      const response = await fetch(apiUrl+`api/flight/autocomplete?query=${origin}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        suggestionsContainer.innerHTML = '';

        data.forEach(el => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = `${el.city}, ${el.name} (${el.iata_code})`;
            suggestionItem.addEventListener('click', () => {
                toSearch.value = el.iata_code;
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.style.display='none';

            });
            suggestionsContainer.appendChild(suggestionItem);
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const origin = document.getElementById('from').value;
    const destination = document.getElementById('to').value;
    const departureDate = document.getElementById('depart-date').value;
    var returnDate = document.getElementById('return-date').value;
    if (returnDate == "") returnDate = undefined;
    if(departureDate=="" || origin=="" || destination==""){
      alert("Please fill all the fields");
      return;
    }
    depDate = departureDate;
    aDate = returnDate;
    const adults = document.getElementById('adults').value;
    console.log({ origin, destination, departureDate,  returnDate, adults });
    try {
      const loaderContainer = document.getElementById('loader-wrapper');
      loaderContainer.classList.remove("hidden");
      const response = await fetch(apiUrl+'api/flight/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ origin, destination, departureDate, adults, returnDate})
      });

      if (response.ok) {
        loaderContainer.classList.add("hidden");
        const data = await response.json();
        data.origin = origin;
        data.destination = destination;
        console.log(data);
        displayDepartureFlights(data, data.isOneWay);
        // Redirect to the desired page after successful search
        // window.location.href = '/search'; // Change this to your desired route
      }
         else {
        const errorData = await response.json();
        alert(errorData.message); // Display error message
      }
    }
     catch (error) {
      console.log('Error:', error);
    }
  });


function  displayDepartureFlights(data, oneWay = true){
    const flightResults = document.getElementById('departure-results');
        flightResults.innerHTML = '';
        console.log(data);
        data.departureFlights.forEach((flight,index) => {
          setTimeout(() => {          
          const flightElement = document.createElement('div');
          flightElement.innerHTML = `
          <div class="main-content">

          <div class="flight-info">
            <div class="flight-logo">
                <!-- Logo placeholder -->
           <img src="${logo(flight.airline_name)}" alt="Airline Logo" style="width: 100%; height: 100%;">
            </div>
            <div class="flight-details">
                <div class="flight-times">
                    <span style="font-size: 14px; color: #171616;">${calculateTime(flight.departure_time)} – ${calculateTime(flight.arrival_time)}</span>
                    <span style="font-size: 14px; color: #171616;">${flight.flight_number}</span>
                    <span style="font-size: 14px; color: #171616;">${flight.airline_name}</span>
                </div>
                <div class="flight-duration">
                    <span style="font-size: 14px; color: #171616;"> ${calculateTravelTime(flight.travel_time)}</span>
                    <span style="font-size: 14px; color: #171616;">${data.origin}-${data.destination}</span>

                </div>
                <div class="flight-type">
                    <span>Nonstop</span>
                </div>
                <div class="flight-price">
                    ₹ ${flight.price}
                </div>
            </div>
             <button class="transport-button" role="button">${oneWay?"Book":"Select"}</button>
        </div>
        </div>
          `;
          flightResults.appendChild(flightElement);
        },index*200);
        });
      if (oneWay){
        flightResults.addEventListener('click', (event) => {
          if(event.target.tagName== 'BUTTON'){
            const flightDetails = event.target;
            const flight = flightDetails.parentElement;
            const flightInfo = flight.querySelector('.flight-details');
            const flightAirline = flightInfo.querySelector('.flight-times').querySelectorAll('span')[1].textContent;
            Cookies.set('departure-flight',JSON.stringify({ID:flightAirline, departureDate:depDate, adults:data.adults}));
            localStorage.removeItem('arrival-flight');
            window.location.href = './passenger-details.html';
          }
        })
      }
      else{
        flightResults.addEventListener('click', (event) => {
          if(event.target.tagName== 'BUTTON'){
            const flightDetails = event.target;
            const flight = flightDetails.parentElement;
            const flightInfo = flight.querySelector('.flight-details');
            const flightAirline = flightInfo.querySelector('.flight-times').querySelectorAll('span')[1].textContent;
            Cookies.set('departure-flight',JSON.stringify({ID:flightAirline, departureDate:depDate, adults:data.adults}));
            localStorage.removeItem('arrival-flight');

            document.getElementById('arrival-body').style.display = 'block';
            document.getElementById('arrival-body').classList.remove('hidden');
            document.getElementById('departure-body').style.display = 'none';
            displayArrivalFlights(data);
          }
        })
      }
}
function goBack(){
  document.getElementById('arrival-results').style.display = 'none';
  document.getElementById('departure-results').style.display = 'block';
}
function logo(airline){
  switch(airline){
    case 'IndiGo':
      return 'https://www.gstatic.com/flights/airline_logos/70px/6E.png';
    case 'Air India':
      return 'https://www.gstatic.com/flights/airline_logos/70px/AI.png';
    case 'SpiceJet':
      return 'https://www.gstatic.com/flights/airline_logos/70px/SG.png';
    case 'Vistara':
      return 'https://www.gstatic.com/flights/airline_logos/70px/UK.png';
    case 'Go Air':
      return 'https://www.gstatic.com/flights/airline_logos/70px/G8.png';
    default:
      return 'https://www.gstatic.com/flights/airline_logos/70px/6E.png';
  }
}
function displayArrivalFlights(data){
  const flightResults = document.getElementById('arrival-results');

  flightResults.innerHTML = '';
  data.returnFlights.forEach(flight => {
    const flightElement = document.createElement('div');
    flightElement.innerHTML = `
    <div class="main-content">

            <div class="flight-info">
      <div class="flight-logo">
          <!-- Logo placeholder -->
           <img src="${logo(flight.airline_name)}" alt="Airline Logo" style="width: 100%; height: 100%;">
      </div>
      <div class="flight-details">
          <div class="flight-times">
              <span style="font-size: 14px; color: #171616;">${calculateTime(flight.departure_time)} – ${calculateTime(flight.arrival_time)}</span>
              <span style="font-size: 14px; color: #171616;">${flight.flight_number}</span>
              <span style="font-size: 14px; color: #171616;">${flight.airline_name}</span>
          </div>
          <div class="flight-duration">
              <span> ${calculateTravelTime(flight.travel_time)}</span>
              <span style="font-size: 14px; color: #171616;">${data.destination}-${data.origin}</span>

          </div>
          <div class="flight-type">
              <span>Nonstop</span>
          </div>
          <div class="flight-price">
              ₹ ${flight.price}
          </div>
      </div>
      <button class="transport-button" role="button">Book</button>
  </div>
  </div>
    `;
    flightResults.appendChild(flightElement);
  });
  flightResults.addEventListener('click', (event) => {
    if(event.target.tagName== 'BUTTON'){
      const flightDetails = event.target;
      const flight = flightDetails.parentElement;
      const flightInfo = flight.querySelector('.flight-details');
      const flightAirline = flightInfo.querySelector('.flight-times').querySelectorAll('span')[1].textContent;
      Cookies.set('arrival-flight',JSON.stringify({ID:flightAirline, arrivalDate:aDate}));
      window.location.href = './passenger-details.html';
    }
  })
}