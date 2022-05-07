const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname, '../public'));
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  console.log(path.join(__dirname, '/../public/index.html'));
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
