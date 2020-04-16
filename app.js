const express = require('express');

const app = express();

app.set('view engine', 'pug');

const numberFormatRegex = /^\d+([.]\d+)?(\/\d+([.]\d+)?)?$/;

const fractionStringToDecimal = (str) => {
    const [a, b] = str.split('/').map(Number);
    return a / b;
} 

const validateNumberString = (num) => {
    switch(true) {
        case (num === ''):
            return 1;

        case (!numberFormatRegex.test(num)):
            return false;

        case (num.includes('/')):
            return fractionStringToDecimal(num);

        default:
            return Number(num); 
    }
}

const getConversionObject = (input) => {
    const [num, unit] = input.split(/([A-z]+)/);

    if (!unit) return 'invalid unit'; // TODO: Add function to check against valid unit types
    
    let initNum = validateNumberString(num);
    if (!initNum) return 'invalid number';

    return { initNum, initUnit: unit };
}

app.post('/convert', (req, res) => {
    const { input } = req.query;
    res.send(getConversionObject(input));
});

app.get('/', (req, res) => {
    res.render('home', { title: 'Converter API' });
});

app.use('/', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

app.listen(8000);