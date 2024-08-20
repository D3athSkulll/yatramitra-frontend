document.querySelectorAll('.transport-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove the 'clicked' class from all buttons
        document.querySelectorAll('.transport-button').forEach(btn => {
            btn.classList.remove('clicked');
        });

        // Add the 'clicked' class to the clicked button
        this.classList.add('clicked');

        // Get the type of ticket to show based on button class
        const ticketType = this.classList[1].replace('-button', '');

        // Hide all ticket sections
        document.querySelectorAll('#flight-tickets, #train-tickets, #bus-tickets').forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected ticket section
        document.querySelector(`#${ticketType}-tickets`).style.display = 'block';
    });
});
function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Invalid date object');
    }

    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    // Return formatted date
    return `${day}/${month}/${year}`;
}
document.querySelectorAll('#flight-tickets, #train-tickets, #bus-tickets').forEach(section => {
    section.style.display = 'none';
});
document.querySelector('#flight-tickets').style.display = 'block'; // Default to show flight tickets
window.addEventListener('load', async ()=>{
    try{
        const loaderContainer = document.getElementById('loader-wrapper');
        loaderContainer.classList.remove("hidden");
    const data = await fetch('https://yatramitra-backend.onrender.com/api/tickets',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
    const res = await data.json();
    var airHTML = '';
    res.air.forEach((ticket)=>{
        airHTML += `
             <div class="flight ticket-card ">
            <div class="ticket">
                <div class="ticket-header">
                    <div class="ticket-number">PNR: ${ticket.pnr}</div>
                </div>
                <div class="ticket-details">
                    <div class="ticket-route">
                        <span>${ticket.source}</span> → <span>${ticket.destination}</span>
                    </div>
                    <div class="ticket-time">
                        <div>Departure Journey: ${formatDate(new Date(ticket.departure))},  ${ticket.departureTime}</div>
                    `
                    if (ticket.arrivalID)
                        airHTML+=`<div>Return Journey: ${formatDate(new Date(ticket.arrival))},  ${ticket.arrivalTime}</div>`
                    airHTML+=`</div><br>
                    <div class="ticket-price">
                        <span>Price: &#8377; ${ticket.price}</span>
                    </div>
                </div>
                <div class="ticket-passengers">
                    <h3>Passengers</h3>
                 `   
                    ticket.passengers.forEach((passenger)=>{
                airHTML+= `<ul>
                        <li>${passenger.name}, Age: ${passenger.age}</li>
                    </ul>`});
                    
                airHTML+=`</div>
            </div>
            </div>
        `
    });
    document.querySelector('#flight-tickets').innerHTML = airHTML;
    if(res.air.length==0){
        document.querySelector('#flight-tickets').innerHTML = `
                    <div class="no-tickets" id="no-tickets">
                <h3>No tickets booked yet!</h3>
                <p>Book your tickets now!</p>
            </div>    `;
    }
    var trainHTML = '';
    res.train.forEach((ticket)=>{
        trainHTML += `
             <div class="train ticket-card ">
            <div class="ticket">
                <div class="ticket-header">
                    <div class="ticket-number">PNR: ${ticket.pnr}</div>
                </div>
                <div class="ticket-details">
                    <div class="ticket-route">
                        <span>${ticket.source}</span> → <span>${ticket.destination}</span>
                    </div>
                    <div class="ticket-time">
                        <div>Departure Journey: ${formatDate(new Date(ticket.departure))},  ${ticket.departureTime}</div>
                    `
                    trainHTML+=`</div>
                    <div class="ticket-price"><br>
                        <span>Price: &#8377; ${ticket.price}</span>
                    </div>
                </div>
                <div class="ticket-passengers">
                    <h3>Passengers</h3>
                 `   
                    ticket.passengers.forEach((passenger)=>{
                 trainHTML+=`<ul>
                        <li>${passenger.name}, Age: ${passenger.age}</li>
                    </ul>`});
                    
                trainHTML+=`</div>
            </div>
            </div>
        `
    });
    document.querySelector('#train-tickets').innerHTML = trainHTML;
    if(res.train.length==0){
        document.querySelector('#train-tickets').innerHTML = `
                    <div class="no-tickets" id="no-tickets">
                <h3>No tickets booked yet!</h3>
                <p>Book your tickets now!</p>
            </div>    `;
    }
    var busHTML = '';
    res.bus.forEach((ticket)=>{
        busHTML += `
             <div class="flight ticket-card ">
            <div class="ticket">
                <div class="ticket-header">
                    <div class="ticket-number">PNR: ${ticket.pnr}</div>
                </div>
                <div class="ticket-details">
                    <div class="ticket-route">
                        <span>${ticket.source}</span> → <span>${ticket.destination}</span>
                    </div>
                    <div class="ticket-time">
                        <div>Departure Journey: ${formatDate(new Date(ticket.departure))},  ${ticket.departureTime}</div>
                    `
                    if (ticket.arrivalID)
                        busHTML+=`<div>Return Journey: ${formatDate(new Date(ticket.arrival))},  ${ticket.arrivalTime}</div>`
                    busHTML+=`</div>
                    <div class="ticket-price"><br>
                        <span>Price: &#8377; ${ticket.price}</span>
                    </div>
                </div>
                <div class="ticket-passengers">
                    <h3>Passengers</h3>
                 `   
                    ticket.passengers.forEach((passenger)=>{
                busHTML+= `<ul>
                        <li>${passenger.name}, Age: ${passenger.age}</li>
                    </ul>`});
                    
                    busHTML+=`</div>
            </div>
            </div>
        `
    });
    document.querySelector('#bus-tickets').innerHTML = busHTML;
    if(res.bus.length==0){
        document.querySelector('#bus-tickets').innerHTML = `
                    <div class="no-tickets" id="no-tickets">
                <h3>No tickets booked yet!</h3>
                <p>Book your tickets now!</p>
            </div>    `;
    }
    document.getElementById('loader-wrapper').classList.add("hidden");
}
catch(err){
    console.error(err);
    alert("You are not logged in! Please login to view your tickets!");
}
});