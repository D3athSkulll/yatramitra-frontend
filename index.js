const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');

// Middleware for parsing JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/views', 'homepage.html'));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/views', 'login.html'));
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
