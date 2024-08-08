document.addEventListener('DOMContentLoaded', async function() {
    // Check if the user is logged in (this is just a placeholder, replace it with your actual login check)
    let isLoggedIn = localStorage.getItem("token"); // Replace this with your actual login logic
    // localStorage.removeItem("token");
    try {
        const response = await fetch("http://localhost:3000/auth/verify", {
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
    // Header HTML
    let headerHTML = `
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

    // Conditional display of login button or user icon
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
            localStorage.removeItem("isLoggedIn"); // Clear login status
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
    searchToggle.addEventListener("click", () => {
        searchToggle.classList.toggle("active");
    });

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