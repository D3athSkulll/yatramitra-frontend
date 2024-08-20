window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    loaderWrapper.classList.add('hidden');
    console.log(loaderWrapper.classList);
    console.log("Loaded");
  });
  function calculateTime(date) {
    date = new Date(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function calculateTravelTime(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const diffMs = endDate - startDate;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHrs} hr ${diffMins} min`;
}


  const token = Cookies.get('token');
  document.addEventListener('DOMContentLoaded', () => {
    // Load data from cookie
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
        const response = await fetch(apiUrl+`api/train/autocomplete?query=${origin}`,{
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
              suggestionItem.textContent = `${el.city}, ${el.name} (${el.stationCode})`;
              suggestionItem.addEventListener('click', () => {
                  fromSearch.value = el.stationCode;
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
        const response = await fetch(apiUrl+`api/train/autocomplete?query=${origin}`,{
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
              suggestionItem.textContent = `${el.city}, ${el.name} (${el.stationCode})`;
              suggestionItem.addEventListener('click', () => {
                  toSearch.value = el.stationCode;
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
  var seats = 0;
  document.getElementById('searchForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const origin = document.getElementById('from').value;
      const destination = document.getElementById('to').value;
      const departureDate = document.getElementById('depart-date').value;
      seats = document.getElementById('adults').value;
      if(departureDate=="" || origin=="" || destination==""){
        alert("Please fill all the fields");
        return;
      }
      console.log({ origin, destination, departureDate,  seats });
      try {
        const loaderContainer = document.getElementById('loader-wrapper');
        loaderContainer.classList.remove("hidden");
        const response = await fetch(apiUrl+'api/train/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ departureStation:origin ,arrivalStation:destination, Date: departureDate, seats})
        });
  
        if (response.ok) {
          loaderContainer.classList.add("hidden");
          const data = await response.json();
          data.origin = origin;
          data.destination = destination;
          console.log(data);
          displayTrains(data, departureDate);
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

    function displayTrains(data, departureDate)
    {
      const trainResults = document.getElementById('departure-results');
      trainResults.innerHTML = '';
      data.trains.forEach((train,index) => {
        setTimeout(()=>{
          const trainElement = document.createElement('div');
          trainElement.innerHTML = `
           <div class="main-content">

          <div class="train-info">

    <div class="train-details">
        <div class="train-times">
            <span style="font-size: 14px; color: #171616;;">${train.trainNumber}</span>

        </div>
        <div class="train-duration">
          <span style="font-size: 14px; color: #171616;;">${train.trainName}</span>
          <span style="font-size: 14px; color: #171616;;">${train.departureStation}-${train.arrivalStation}</span>

      </div>

        <div class="train-duration">
          <span style="font-size: 14px; color: #171616;;">${calculateTime(train.departureTime)} - ${calculateTime(train.arrivalTime)}</span>
          <span style="font-size: 14px; color: #171616;;">${calculateTravelTime(train.departureTime, train.arrivalTime)}</span>

        </div>

        <div class="train-price" id="train-price">
            ₹ ${train.price? train.price : 'N/A'}
        </div>
    </div>
    <button class="transport-button" role="button">Book</button>
</div>
</div>

        `;
        trainResults.appendChild(trainElement);
},index*100);
});
trainResults.addEventListener('click', (event) => {
            if(event.target.tagName== 'BUTTON'){
              const trainDetails = event.target;
              const train = trainDetails.parentElement;
              const trainInfo = train.querySelector('.train-details');
              var trainPrice = trainInfo.querySelector('.train-price').textContent;
              const trainNumber = trainInfo.querySelector('.train-times').querySelector('span').textContent;
              const trainDuration = trainInfo.querySelectorAll('.train-duration')[1].querySelector('span').textContent;
              const trainName = trainInfo.querySelector('.train-duration').querySelector('span').textContent;
              trainPrice = trainPrice.replace(/[^\d]/g, '');
              Cookies.set('departure-train', JSON.stringify({ trainPrice, trainNumber, trainName, origin: data.origin,
                                                                         destination: data.destination, seats, departureDate, trainDuration }));
              
              window.location.href = './train-details.html';
            }
          });
          
    }
  
   
