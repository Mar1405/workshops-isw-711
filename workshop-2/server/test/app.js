const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();
//middlewares
app.use(bodyParser.json());

//routes
app.get('/tipocambio', function (req, res) {
  if(req.query.tipo == 'euro') {
    res.json({
      "TipoCompraEuros" : "731.85",
      "TipoVentaEuros" : "761.9"
    });
  } else {
    res.json({
      "TipoCompraDolares" : "621",
      "TipoVentaDolares" : "621"
    });
  }
});

app.get('/paises', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map(country => ({
      name: country.name.common,
      currency: country.currencies[0] // Assuming the first currency is what you want
    }));
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//start the app
app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))