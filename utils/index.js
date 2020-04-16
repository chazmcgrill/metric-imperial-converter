const NUMBER_FORMAT_REGEX = /^\d+([.]\d+)?(\/\d+([.]\d+)?)?$/;

const UNITS_DATA = {
    mi: {
        longName: 'miles',
        returnUnit: 'km',
        conversion: (val) => val * 1.60934,
    },
    km: {
        longName: 'kilometers',
        returnUnit: 'mi',
        conversion: (val) => val / 1.60934,
    },
    lbs: {
        longName: 'pounds',
        returnUnit: 'kg',
        conversion: (val) => val / 2.20462,
    },
    kg: {
        longName: 'kilograms',
        returnUnit: 'lbs',
        conversion: (val) => val * 2.20462,
    },
    gal: {
        longName: 'gallons',
        returnUnit: 'L',
        conversion: (val) => val / 4.54609,
    },
    L: {
        longName: 'litres',
        returnUnit: 'gal',
        conversion: (val) => val * 4.54609,
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

const roundedNum = num => num.toFixed(5);

const getConversionObject = (input) => {
    const [num, initUnit] = input.split(/([A-z]+)/);
    const unitData = UNITS_DATA[initUnit];

    if (!unitData) return 'invalid unit';

    const formattedNum = validateNumberString(num);

    if (!formattedNum) return 'invalid number';

    const { longName, returnUnit, conversion } = unitData;
    const returnNum = roundedNum(conversion(formattedNum));
    const returnLongName = UNITS_DATA[returnUnit].longName;
    const initNum = roundedNum(formattedNum);
    const string = `${initNum} ${longName} converts to ${returnNum} ${returnLongName}`;

    return { initNum, initUnit, returnNum, returnUnit, string };
};

module.exports = {
    getConversionObject: getConversionObject,
}