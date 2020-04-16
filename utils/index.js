const NUMBER_FORMAT_REGEX = /^\d+([.]\d+)?(\/\d+([.]\d+)?)?$/;

const UNITS_DATA = {
    mi: {
        longName: 'miles',
        returnUnit: 'km',
        convert: (val) => val * 1.60934,
    },
    km: {
        longName: 'kilometers',
        returnUnit: 'mi',
        convert: (val) => val / 1.60934,
    },
    lbs: {
        longName: 'pounds',
        returnUnit: 'kg',
        convert: (val) => val / 2.20462,
    },
    kg: {
        longName: 'kilograms',
        returnUnit: 'lbs',
        convert: (val) => val * 2.20462,
    },
    gal: {
        longName: 'gallons',
        returnUnit: 'l',
        convert: (val) => val / 4.54609,
    },
    l: {
        longName: 'litres',
        returnUnit: 'gal',
        convert: (val) => val * 4.54609,
    },
};

const fractionStringToDecimal = (str) => {
    const [a, b] = str.split('/').map(Number);
    return a / b;
}

const validateNumberString = (num) => {
    switch (true) {
        case (num === ''):
            return 1;

        case (!NUMBER_FORMAT_REGEX.test(num)):
            return false;

        case (num.includes('/')):
            return fractionStringToDecimal(num);

        default:
            return Number(num);
    }
}

const roundedNum = num => num % 1 === 0 ? num : num.toFixed(5);

const getConversionObject = (input) => {
    const [num, initUnit] = input.split(/([A-z]+)/);
    const formattedNum = validateNumberString(num);
    const unitData = UNITS_DATA[initUnit];

    if (!unitData && !formattedNum) return 'invalid number and unit';
    if (!unitData) return 'invalid unit';
    if (!formattedNum) return 'invalid number';

    const { longName, returnUnit, convert } = unitData;
    const returnNum = roundedNum(convert(formattedNum));
    const returnLongName = UNITS_DATA[returnUnit].longName;
    const initNum = roundedNum(formattedNum);
    const string = `${initNum} ${longName} converts to ${returnNum} ${returnLongName}`;

    return { initNum, initUnit, returnNum, returnUnit, string };
};

module.exports = {
    getConversionObject: getConversionObject,
}