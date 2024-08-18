document.getElementById('reset-password-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('pass').value;
    const confirmPassword = document.getElementById('confirmPass').value;
    const responseMessage = document.getElementById('response-message');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    responseMessage.textContent = '';
    responseMessage.style.color = 'red';

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        responseMessage.textContent = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        return;
    }

    if (password !== confirmPassword) {
        responseMessage.textContent = 'Passwords do not match!';
        return;
    }
    const loaderContainer = document.getElementById('loader-wrapper');
    loaderContainer.classList.remove("hidden");
    fetch(`https://yatramitra-backend.onrender.com/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            password: password }),
    })
    .then(response => response.json())
    .then(data => {
        loaderContainer.classList.add("hidden");
        if (data.data) {
            responseMessage.textContent = 'Your password has been successfully reset.';
            responseMessage.style.color = '#28a745';
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 3000);
        } else {
            responseMessage.textContent = 'Error resetting password. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        responseMessage.textContent = 'Error resetting password. Please try again.';
    });
});
