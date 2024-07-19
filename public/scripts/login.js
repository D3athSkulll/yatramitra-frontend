document.addEventListener('DOMContentLoaded', function() {
    // Login
    document.getElementById('loginButton').addEventListener('click', function() {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPass').value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email) || !password) return;

      const apiUrl = 'auth/login';
      const userData = {
          email,
          password
      };

      fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Success:', data);
          // Handle success
      })
      .catch((error) => {
          console.error('Error:', error);
          // Handle error
      });
    });
    //Register
    document.getElementById('registerButton').addEventListener('click', function() {
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPass').value;
        const name = document.getElementById('regName').value;
        const number = document.getElementById('regNumber').value;
        const confirmPass = document.getElementById('confirmPass').value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
        if (!emailRegex.test(email) || !password) return;
  
        const apiUrl = 'auth/register';
        const userData = {
            email,
            password,
            name,
            number
        };
  
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Handle success
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error
        });
      });
  });