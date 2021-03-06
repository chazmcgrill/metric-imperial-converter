const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const utils = require('./utils');

const app = express();

app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

app.post('/convert', (req, res) => {
    const { input } = req.body;
    const conversionObject = utils.getConversionObject(input);
    res.render('home', { title: 'Converter API', conversionObject });
});

app.get('/convert', (req, res) => {
    const { input } = req.query;
    res.send(utils.getConversionObject(input));
});

app.get('/', (req, res) => {
    res.render('home', { title: 'Converter API' });
});

app.use('/', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

app.listen(8000);