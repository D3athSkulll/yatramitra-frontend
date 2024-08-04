document.addEventListener("DOMContentLoaded", function() {
    const flightButton = document.getElementById("flight-button");
    const trainButton = document.getElementById("train-button");
    const busButton = document.getElementById("bus-button");

    const flightForm = document.getElementById("flight-form");
    const trainForm = document.getElementById("train-form");
    const busForm = document.getElementById("bus-form");

    // Adjust the form size based on the number of fields
    const forms = [flightForm, trainForm, busForm];

    function showForm(formToShow) {
        forms.forEach(form => {
            if (form === formToShow) {
                form.classList.add("active");
                form.classList.remove("less-content"); // Ensure the class is removed if it was applied before
            } else {
                form.classList.remove("active");
                form.classList.add("less-content"); // Apply the class to forms that are hidden
            }
        });
    }

    flightButton.addEventListener("click", function() {
        showForm(flightForm);
    });

    trainButton.addEventListener("click", function() {
        showForm(trainForm);
    });

    busButton.addEventListener("click", function() {
        showForm(busForm);
    });
});
