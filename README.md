# Metric / Imperial Convertor API

An node express api that converts between metric and imperial units. Number should be either integer, decimal,  fraction or mixed formats. These short hand unit formats: em mi, km, gal, l, lbs and kg are supported.

## Example Usage

- /convert?input=4gal
- /convert?input=1/2km
- /convert?input=5.4/3lbs
- /convert?input=kg

## Example Return

```
{
    "initNum": 3.1,
    "initUnit": "mi",
    "returnNum": 4.98895,
    "returnUnit":"km",
    "string": "3.1 miles converts to 4.98895 kilometers"
}
```

