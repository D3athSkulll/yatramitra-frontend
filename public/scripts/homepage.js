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
    let isAnimating = false;

    btnForm1.addEventListener('click', () => {
        switchForm(0);
        switchAds(0);
    });
    btnForm2.addEventListener('click', () => {
        switchForm(1);
        switchAds(1);
    });
    btnForm3.addEventListener('click', () => {
        switchForm(2);
        switchAds(2);
    });

    function switchForm(targetIndex) {
        if (isAnimating || targetIndex === currentFormIndex) return;

        isAnimating = true;
        const outgoingForm = forms[currentFormIndex];
        const incomingForm = forms[targetIndex];
        

        incomingForm.classList.remove('hidden');
        outgoingForm.classList.add('hidden');
        currentFormIndex = targetIndex;
    }

    function switchAds(targetIndex) {
        // if (targetIndex === currentAdIndex) return;

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
    switchForm(0);
    switchAds(0);
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
});