document.addEventListener('DOMContentLoaded', () => {
    const btnForm1 = document.getElementById('flight-button');
    const btnForm2 = document.getElementById('train-button');
    const btnForm3 = document.getElementById('bus-button');
    const form1 = document.getElementById('flight-form');
    const form2 = document.getElementById('train-form');
    const form3 = document.getElementById('bus-form');
    const ad1 = document.getElementById('flight-carousel');
    const ad2 = document.getElementById('train-carousel');
    const ad3 = document.getElementById('bus-carousel');
    const forms = [form1, form2, form3];
    const ads = [ad1, ad2, ad3];

    let currentFormIndex = 0;
    let currentAdIndex = 0;

    btnForm1.addEventListener('click', () => {
        btnForm1.classList.add('selected');
        btnForm2.classList.remove('selected');
        btnForm3.classList.remove('selected');
        switchForm(0);
        switchAds(0);
    });
    btnForm2.addEventListener('click', () => {
        btnForm2.classList.add('selected');
        btnForm1.classList.remove('selected');
        btnForm3.classList.remove('selected');
        switchForm(1);
        switchAds(1);
    });
    btnForm3.addEventListener('click', () => {
        btnForm3.classList.add('selected');
        btnForm2.classList.remove('selected');
        btnForm1.classList.remove('selected');
        switchForm(2);
        switchAds(2);
    });
const flightDeparture = document.getElementById('flight-departure-date');
const flightArrival = document.getElementById('flight-arrival-date');
const trainDeparture = document.getElementById('train-departure-date');
const busDeparture = document.getElementById('bus-departure-date');
const busArrival = document.getElementById('bus-arrival-date');
const today = new Date().toISOString().split("T")[0];
flightDeparture.setAttribute('min', today);
flightArrival.setAttribute('min', today);
trainDeparture.setAttribute('min', today);
busDeparture.setAttribute('min', today);
busArrival.setAttribute('min', today);
flightDeparture.addEventListener('input', () => {
    flightArrival.setAttribute('min', flightDeparture.value);
});
busDeparture.addEventListener('input', () => {
    busArrival.setAttribute('min', busDeparture.value);
});
const token = Cookies.get('token');
const apiUrl = "https://yatramitra-backend.onrender.com/"
const flightFrom = document.getElementById('flight-from');
const flightTo = document.getElementById('flight-to');
const trainFrom = document.getElementById('train-from');
const trainTo = document.getElementById('train-to');
const busFrom = document.getElementById('bus-from');
const busTo = document.getElementById('bus-to');
flightFrom.addEventListener('input', async(event) => {
    const origin = event.target.value;
    const suggest = document.getElementById('suggestions-flight-1');
    if(!origin|| origin==""){
        suggest.style.display = 'none';
        return;
    }
    suggest.style.display = 'block';
    try {
        const response = await fetch(apiUrl+`api/flight/autocomplete?query=${origin}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          suggest.innerHTML = '';
  
          data.forEach(el => {
              const suggestionItem = document.createElement('div');
              suggestionItem.classList.add('suggestion-item');
              suggestionItem.textContent = `${el.city}, ${el.name} (${el.iata_code})`;
              suggestionItem.addEventListener('click', () => {
                  flightFrom.value = el.iata_code;
                  suggest.innerHTML = '';
                  suggest.style.display='none';
  
              });
              suggest.appendChild(suggestionItem);
          });
        } else {
          const errorData = await response.json();
          alert("You are not logged in");
        }
      } catch (error) {
        console.log('Error:', error);
      }


});
flightTo.addEventListener('input', async(event) => {
    const origin = event.target.value;
    const suggest = document.getElementById('suggestions-flight-2');
    if(!origin|| origin==""){
        suggest.style.display = 'none';
        return;
    }
    suggest.style.display = 'block';
    try {
        const response = await fetch(apiUrl+`api/flight/autocomplete?query=${origin}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          suggest.innerHTML = '';
  
          data.forEach(el => {
              const suggestionItem = document.createElement('div');
              suggestionItem.classList.add('suggestion-item');
              suggestionItem.textContent = `${el.city}, ${el.name} (${el.iata_code})`;
              suggestionItem.addEventListener('click', () => {
                flightTo.value = el.iata_code;
                  suggest.innerHTML = '';
                  suggest.style.display='none';
  
              });
              suggest.appendChild(suggestionItem);
          });
        } else {
          const errorData = await response.json();
          alert("You are not logged in");
        }
      } catch (error) {
        console.log('Error:', error);
      }


});
trainTo.addEventListener('input', async(event) => {
    const origin = event.target.value;
    const suggest = document.getElementById('suggestions-train-2');
    if(!origin|| origin==""){
        suggest.style.display = 'none';
        return;
    }
    suggest.style.display = 'block';
    try {
        const response = await fetch(apiUrl+`api/train/autocomplete?query=${origin}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          suggest.innerHTML = '';
  
          data.forEach(el => {
              const suggestionItem = document.createElement('div');
              suggestionItem.classList.add('suggestion-item');
              suggestionItem.textContent = `${el.city}, ${el.name} (${el.stationCode})`;
              suggestionItem.addEventListener('click', () => {
                trainTo.value = el.stationCode;
                  suggest.innerHTML = '';
                  suggest.style.display='none';
  
              });
              suggest.appendChild(suggestionItem);
          });
        } else {
          const errorData = await response.json();
          alert("You are not logged in");
        }
      } catch (error) {
        console.log('Error:', error);
      }


});
trainFrom.addEventListener('input', async(event) => {
    const origin = event.target.value;
    const suggest = document.getElementById('suggestions-train-1');
    if(!origin|| origin==""){
        suggest.style.display = 'none';
        return;
    }
    suggest.style.display = 'block';
    try {
        const response = await fetch(apiUrl+`api/train/autocomplete?query=${origin}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          suggest.innerHTML = '';
  
          data.forEach(el => {
              const suggestionItem = document.createElement('div');
              suggestionItem.classList.add('suggestion-item');
              suggestionItem.textContent = `${el.city}, ${el.name} (${el.stationCode})`;
              suggestionItem.addEventListener('click', () => {
                trainFrom.value = el.stationCode;
                  suggest.innerHTML = '';
                  suggest.style.display='none';
  
              });
              suggest.appendChild(suggestionItem);
          });
        } else {
          const errorData = await response.json();
          alert("You are not logged in");
        }
      } catch (error) {
        console.log('Error:', error);
      }


});
busTo.addEventListener('input', async(event) => {
    const origin = event.target.value;
    const suggest = document.getElementById('suggestions-bus-2');
    if(!origin|| origin==""){
        suggest.style.display = 'none';
        return;
    }
    suggest.style.display = 'block';
    try {
        const response = await fetch(apiUrl+`api/bus/autocomplete?query=${origin}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          suggest.innerHTML = '';
  
          data.forEach(el => {
              const suggestionItem = document.createElement('div');
              suggestionItem.classList.add('suggestion-item');
              suggestionItem.textContent = `${el.city}, ${el.country}`;
              suggestionItem.addEventListener('click', () => {
                busTo.value = el.city;
                  suggest.innerHTML = '';
                  suggest.style.display='none';
  
              });
              suggest.appendChild(suggestionItem);
          });
        } else {
          const errorData = await response.json();
          alert("You are not logged in");
        }
      } catch (error) {
        console.log('Error:', error);
      }


});
busFrom.addEventListener('input', async(event) => {
    const origin = event.target.value;
    const suggest = document.getElementById('suggestions-bus-1');
    if(!origin|| origin==""){
        suggest.style.display = 'none';
        return;
    }
    suggest.style.display = 'block';
    try {
        const response = await fetch(apiUrl+`api/bus/autocomplete?query=${origin}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          suggest.innerHTML = '';
  
          data.forEach(el => {
              const suggestionItem = document.createElement('div');
              suggestionItem.classList.add('suggestion-item');
              suggestionItem.textContent = `${el.city}, ${el.country}`;
              suggestionItem.addEventListener('click', () => {
                busFrom.value = el.city;
                  suggest.innerHTML = '';
                  suggest.style.display='none';
  
              });
              suggest.appendChild(suggestionItem);
          });
        } else {
          const errorData = await response.json();
          alert("You are not logged in");
        }
      } catch (error) {
        console.log('Error:', error);
      }


});
function switchForm(targetIndex) {
        if (targetIndex === currentFormIndex) return;

        forms[currentFormIndex].classList.add('hidden');
        forms[targetIndex].classList.remove('hidden');
        currentFormIndex = targetIndex;
    }

    function switchAds(targetIndex) {
        ads[currentAdIndex].classList.add('hidden');
        ads[targetIndex].classList.remove('hidden');
        currentAdIndex = targetIndex;
    }

    function nextAd(carouselId) {
        const carousel = document.getElementById(carouselId).querySelector('.carousel');
        const ads = carousel.querySelectorAll('.ad-item');
        let currentIndex = Array.from(ads).findIndex(ad => ad.classList.contains('active'));

        ads[currentIndex].classList.remove('active');

        const nextIndex = (currentIndex + 1) % ads.length;

        ads[nextIndex].classList.add('active');

        carousel.style.transform = `translateX(-${nextIndex * 100}%)`;
    }

    function prevAd(carouselId) {
        const carousel = document.getElementById(carouselId).querySelector('.carousel');
        const ads = carousel.querySelectorAll('.ad-item');
        let currentIndex = Array.from(ads).findIndex(ad => ad.classList.contains('active'));

        ads[currentIndex].classList.remove('active');

        const prevIndex = (currentIndex - 1 + ads.length) % ads.length;

        ads[prevIndex].classList.add('active');

        carousel.style.transform = `translateX(-${prevIndex * 100}%)`;
    }

    // Initialize the first form and ads as visible
    forms.forEach((form, index) => {
        if (index !== currentFormIndex) form.classList.add('hidden');
    });
    ads.forEach((ad, index) => {
        if (index !== currentAdIndex) ad.classList.add('hidden');
    });

    document.getElementById('flightPrevBtn').addEventListener('click', () => prevAd('flight-carousel'));
    document.getElementById('flightNextBtn').addEventListener('click', () => nextAd('flight-carousel'));

    document.getElementById('trainPrevBtn').addEventListener('click', () => prevAd('train-carousel'));
    document.getElementById('trainNextBtn').addEventListener('click', () => nextAd('train-carousel'));

    document.getElementById('busPrevBtn').addEventListener('click', () => prevAd('bus-carousel'));

    document.getElementById('busNextBtn').addEventListener('click', () => nextAd('bus-carousel'));

    // Round Trip and One Way functionality
    var roundtripButton = document.querySelector("#flight-round-trip");
    var onewaytripButton = document.querySelector("#flight-one-way-trip");

    roundtripButton.addEventListener("click", () => {
        document.querySelector("#flight-arrival-date").disabled = false;
        document.querySelector("#flight-arrival-date").type = "date";
    });

    onewaytripButton.checked = true;
    onewaytripButton.addEventListener("click", () => {
        document.querySelector("#flight-arrival-date").disabled = true;
        document.querySelector("#flight-arrival-date").type = "text";
        document.querySelector("#flight-arrival-date").value = "SELECT ROUND TRIP";
    });
    document.getElementById("bus-round-trip").addEventListener("click", () => {
        document.querySelector("#bus-arrival-date").disabled = false;
        document.querySelector("#bus-arrival-date").type = "date";
    });

    document.getElementById("bus-one-way-trip").addEventListener("click", () => {
        document.querySelector("#bus-arrival-date").disabled = true;
        document.querySelector("#bus-arrival-date").type = "text";
        document.querySelector("#bus-arrival-date").value = "SELECT ROUND TRIP";
    });
    document.getElementById("flight-buttonSubmit").addEventListener('click', async () => {
        const origin = document.getElementById('flight-from').value;
        const destination = document.getElementById('flight-to').value;
        const departureDate = document.getElementById('flight-departure-date').value;
        var arrival = document.getElementById('flight-arrival-date').value;
        if(arrival == "SELECT ROUND TRIP"){
            arrival = null;
        }
        if(!origin || !destination || !departureDate){
            alert("Please fill all the fields");
            return;
        }
        if(arrival!=null && (new Date(departureDate) > new Date(arrival))){
            alert("Arrival date should be after departure date");
            return;
        }
        Cookies.set('formData', JSON.stringify({origin, destination, departureDate, arrival, adults:1}));
        window.location.href='./flightsearch.html'
    });
    document.getElementById("train-buttonSubmit").addEventListener('click', async () => {
        const origin = document.getElementById('train-from').value;
        const destination = document.getElementById('train-to').value;
        const departureDate = document.getElementById('train-departure-date').value;
        if(!origin || !destination || !departureDate){
            alert("Please fill all the fields");
            return;
        }
        Cookies.set('formData', JSON.stringify({origin, destination, departureDate, adults:1}));
        window.location.href='./trainsearch.html'
    });
    document.getElementById("bus-buttonSubmit").addEventListener('click', async () => {
        const origin = document.getElementById('bus-from').value;
        const destination = document.getElementById('bus-to').value;
        const departureDate = document.getElementById('bus-departure-date').value;
        var arrival = document.getElementById('bus-arrival-date').value;
        if(arrival == "SELECT ROUND TRIP"){
            arrival = null;
        }
        if(!origin || !destination || !departureDate){
            alert("Please fill all the fields");
            return;
        }
        if(arrival!=null && (new Date(departureDate) > new Date(arrival))){
            alert("Arrival date should be after departure date");
            return;
        }
        Cookies.set('formData', JSON.stringify({origin, destination, departureDate, arrival, adults:1}));
        window.location.href='./bussearch.html'
    });
});



const gpCarousel = document.querySelector('.gp-carousel');

let isDown = false;
let startX;
let scrollLeft;

gpCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    gpCarousel.classList.add('active');
    startX = e.pageX - gpCarousel.offsetLeft;
    scrollLeft = gpCarousel.scrollLeft;
});

gpCarousel.addEventListener('mouseleave', () => {
    isDown = false;
    gpCarousel.classList.remove('active');
});

gpCarousel.addEventListener('mouseup', () => {
    isDown = false;
    gpCarousel.classList.remove('active');
});

gpCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gpCarousel.offsetLeft;
    const walk = (x - startX) * 3; // Scroll speed
    gpCarousel.scrollLeft = scrollLeft - walk;
});
