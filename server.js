// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());


var registration = require("./routes/Registration");

app.use('/registration',registration)  





// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
