document.addEventListener("DOMContentLoaded", async function() {
    const loaderContainer = document.getElementById('loader-wrapper');
    loaderContainer.classList.add("hidden");
    document.getElementById("contact-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const fName = document.getElementById("first-name").value;
        const lName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const number = document.getElementById("phone").value;
        const message = document.getElementById("query").value;
        if(fName === "" || lName === "" || email === "" || number === "" || message === "") {
            alert("Please fill in all fields");
            return;
        }
        loaderContainer.classList.remove("hidden");
        fetch("https://yatramitra-backend.onrender.com/contact/post",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fName + " " + lName,
                email,
                number,
                message
            })
        }).then(async function(response) {
            loaderContainer.classList.add("hidden");
            if(response.ok)
                alert("Your query has been submitted successfully");
             else 
                alert("There was an error submitting your query. Please try again later");
        })
    });
})
