document.getElementById('forgot-password-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const responseMessage = document.getElementById('response-message');
    const loaderContainer = document.getElementById('loader-wrapper');
    loaderContainer.classList.remove("hidden");
    // Clear any previous message
    responseMessage.textContent = '';
    
    // Simulate sending the request (here you would actually send a request to your server)
    fetch('https://yatramitra-backend.onrender.com/auth/forgot-password',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        loaderContainer.classList.add("hidden");
        responseMessage.textContent = "If an account exists, a reset password email has been sent."

    })
    .catch(error => {
        loaderContainer.classList.add("hidden");
        // Display the error message
        responseMessage.textContent = "If an account exists, a reset password email has been sent."
    });
});
