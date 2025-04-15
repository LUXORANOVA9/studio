const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', dataRoutes);

app.get('/', (req, res) => {
    res.send('LuxoraNova API is running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
