document.addEventListener('DOMContentLoaded', async function() {
    // Check if the user is logged in (this is just a placeholder, replace it with your actual login check)
    let isLoggedIn = localStorage.getItem("token");
    // localStorage.removeItem("token");
    try {
    // Header HTML
    var headerHTML = `
    <nav>
        <div class="nav-bar">
            <i class='bx bx-menu sidebarOpen'></i>
            <span class="logo navLogo"><a href="./homepage.html">Yatramitra</a></span>
            <div class="menu">
                <div class="logo-toggle">
                    <span class="logo"><a href="./homepage.html">Yatramitra</a></span>
                    <i class='bx bx-x siderbarClose'></i>
                </div>
                <ul class="nav-links">
                    <li><a href="./homepage.html"><span>Home</span></a></li>
                    <li><a href="./about.html"><span>About</span></a></li>
                    <li><a href="./services.html"><span>Services</span></a></li>
                    <li><a href="./contact.html"><span>Contact</span></a></li>
                </ul>
            </div>
            <div class="darkLight-searchBox">`;
    document.getElementById('header').innerHTML = headerHTML;
    const footer = `
    <div class="footer-container">
<<<<<<< Updated upstream
                <div class="footer-row">
=======
                <div class="row">
>>>>>>> Stashed changes
                    <div class="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><a href="./about.html">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">terms of service</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="./contact.html">contact us</a></li>
                            <li><a href="#">cancellations & refunds</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-col">
                        <h4>follow us</h4>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-github"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    &copy; 2024 YatraMitra. All rights reserved.
                </div>
            </div>
    `
    document.getElementById('footer').innerHTML = footer;
    // Conditional display of login button or user icon
    const response = await fetch("https://yatramitra-backend.onrender.com/auth/verify", {
        headers: {
            "Authorization": `Bearer ${isLoggedIn}`
        }
    });

    if (response.status==200) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }
} catch (err) {
    isLoggedIn = false;
}
    if (isLoggedIn) {
        headerHTML += `
                <div class="userMenu">
                    <i class='bx bx-user-circle userIcon'></i>
                    <div class="dropdown">
                        <a href="./tickets.html">Show Tickets</a>
                        <a href="#" id="logout">Logout</a>
                    </div>
                </div>`;
    } else {
        headerHTML += `
                <button class="loginButton" type="submit"><a href="./login.html">Login</a></button>`;
    }

    headerHTML += `
            </div>
        </div>
    </nav>`;

    document.getElementById('header').innerHTML = headerHTML;

    // Add event listener for logout
    if (isLoggedIn) {
        document.getElementById("logout").addEventListener("click", function() {
            localStorage.removeItem("token"); // Clear login status
            location.reload(); // Reload the page to reflect changes
        });
    }

    // Rest of your JavaScript
    const body = document.querySelector("body"),
          nav = document.querySelector("nav"),
          modeToggle = document.querySelector(".dark-light"),
          searchToggle = document.querySelector(".searchToggle"),
          sidebarOpen = document.querySelector(".sidebarOpen"),
          siderbarClose = document.querySelector(".siderbarClose");

  

    // toggle search box
    // toggle sidebar
    sidebarOpen.addEventListener("click", () => {
        nav.classList.add("active");
    });

    body.addEventListener("click", e => {
        let clickedElm = e.target;

        if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
            nav.classList.remove("active");
        }
    });
});