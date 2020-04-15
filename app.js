const express = require('express');

const app = express();

app.set('view engine', 'pug');

function validateInput(input) {
    const [value, unit] = input.split(/([A-z]+)/).filter(Boolean);
    return { value, unit }
}

app.post('/convert', (req, res) => {
    const { input } = req.query;
    res.send(validateInput(input))
});

app.get('/', (req, res) => {
    res.render('home', { title: 'Converter API' });
});

app.use('/', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

app.listen(8000);