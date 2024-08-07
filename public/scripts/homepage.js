document.addEventListener('DOMContentLoaded', () => {
    const btnForm1 = document.getElementById('flight-button');
    const btnForm2 = document.getElementById('train-button');
    const btnForm3 = document.getElementById('bus-button');
    const form1 = document.getElementById('flight-form');
    const form2 = document.getElementById('train-form');
    const form3 = document.getElementById('bus-form');
    const forms = [form1, form2,form3];

    let currentFormIndex = 0;
    let isAnimating = false;

    btnForm1.addEventListener('click', () => switchForm(0));
    btnForm2.addEventListener('click', () => switchForm(1));
    btnForm3.addEventListener('click', () => switchForm(2));

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

    switchForm(0);
    var roundtripButton = document.querySelector("#flight-round-trip");

    roundtripButton.addEventListener("click", ()=>{

        document.querySelector("#flight-arrival-date").disabled = false;
        document.querySelector("#flight-arrival-date").type="date";

    });

    var onewaytripButton = document.querySelector("#flight-one-way-trip");
    onewaytripButton.checked = true;
    onewaytripButton.addEventListener("click", ()=>{

    document.querySelector("#flight-arrival-date").disabled = true;
    document.querySelector("#flight-arrival-date").type="text";
    document.querySelector("#flight-arrival-date").value = "SELECT ROUND TRIP";

    });
    });

