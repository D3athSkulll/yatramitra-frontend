document.addEventListener('DOMContentLoaded', () => {
    const btnForm1 = document.getElementById('flight-button');
    const btnForm2 = document.getElementById('train-button');
    const btnForm3 = document.getElementById('bus-button');
    const form1 = document.getElementById('flight-form');
    const form2 = document.getElementById('train-form');
    const form3 = document.getElementById('bus-form');
    const ad1 = document.getElementById('flight-ads');
    const ad2 = document.getElementById('train-ads');
    const ad3 = document.getElementById('bus-ads');
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
        
        const direction = targetIndex > currentFormIndex ? 1 : -1;

        incomingForm.classList.remove('hidden');
        incomingForm.style.transform = `rotateY(${direction * 180}deg)`;
        setTimeout(() => {
            outgoingForm.style.transform = `rotateY(${direction * -180}deg)`;
            incomingForm.style.transform = `rotateY(0deg)`;

            setTimeout(() => {
                outgoingForm.classList.add('hidden');
                outgoingForm.style.transform = '';
                currentFormIndex = targetIndex;
                isAnimating = false;
            }, 600);
        }, 20);
    }

    function switchAds(targetIndex) {
        // if (targetIndex === currentAdIndex) return;

        ads[currentAdIndex].classList.add('hidden');
        ads[targetIndex].classList.remove('hidden');

        currentAdIndex = targetIndex;
    }

    // Initialize the first form and ads as visible
    switchForm(0);
    switchAds(0);

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