const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const careerRoutes = require('./routes/careerRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/careersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

app.use(bodyParser.json());
app.use(cors());

app.use('/api/careers', careerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


