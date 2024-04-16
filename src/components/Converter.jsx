import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { ArrowsDownUp, Backspace, Dot } from "@phosphor-icons/react";

const Buttons = {
    row1: [
        {
            value: "AC",
            label: "AC",
            className: "bg-light-300 dark:bg-dark-300 flex-1 !h-[60px]",
            type: "clear",
        },
        {
            value: "swap",
            label: <ArrowsDownUp size={ 25 } />,
            className: "bg-light-300 dark:bg-dark-300 flex-1 !h-[60px] ",
            type: "swap",
        },
    ],
    row2: [
        { value: "7", label: "7", type: "number" },
        { value: "8", label: "8", type: "number" },
        { value: "9", label: "9", type: "number" },
    ],
    row3: [
        { value: "4", label: "4", type: "number" },
        { value: "5", label: "5", type: "number" },
        { value: "6", label: "6", type: "number" },
    ],
    row4: [
        { value: "1", label: "1", type: "number" },
        { value: "2", label: "2", type: "number" },
        { value: "3", label: "3", type: "number" },
    ],
    row5: [
        { value: "0", label: "0", type: "number" },
        { value: ".", label: <Dot size={ 25 } />, type: "dot" },
        {
            value: "Backspace",
            label: <Backspace size={ 25 } />,
            type: "Backspace",
        },
    ],
};

const converters = [
    {
        name: "Length",
        units: [
            {
                name: "Millimeter",
                value: 0.001,
                unit: "mm",
            },
            {
                name: "Centimeter",
                value: 0.01,
                unit: "cm",
            },
            {
                name: "Meter",
                value: 1,
                unit: "m",
            },
            {
                name: "Kilometer",
                value: 1000,
                unit: "km",
            },
            {
                name: "Inch",
                value: 0.0254,
                unit: "in",
            },
            {
                name: "Foot",
                value: 0.3048,
                unit: "ft",
            },
            {
                name: "Yard",
                value: 0.9144,
                unit: "yd",
            },
            {
                name: "Mile",
                value: 1609.344,
                unit: "mi",
            },
        ],
    },
    {
        name: "Area",
        units: [
            {
                name: "Square Millimeter",
                value: 0.000001,
                unit: "mm²",
            },
            {
                name: "Square Centimeter",
                value: 0.0001,
                unit: "cm²",
            },
            {
                name: "Square Meter",
                value: 1,
                unit: "m²",
            },
            {
                name: "Square Kilometer",
                value: 1000000,
                unit: "km²",
            },
            {
                name: "Square Inch",
                value: 0.00064516,
                unit: "in²",
            },
            {
                name: "Square Foot",
                value: 0.09290304,
                unit: "ft²",
            },
            {
                name: "Square Yard",
                value: 0.83612736,
                unit: "yd²",
            },
            {
                name: "Square Mile",
                value: 2589988.110336,
                unit: "mi²",
            },
            {
                name: "Hectare",
                value: 10000,
                unit: "ha",
            },
            {
                name: "Acre",
                value: 4046.8564224,
                unit: "ac",
            },
        ],
    },
    {
        name: "Volume",
        units: [
            {
                name: "Milliliter",
                value: 0.001,
                unit: "ml",
            },
            {
                name: "Liter",
                value: 1,
                unit: "l",
            },
            {
                name: "Cubic Meter",
                value: 1000,
                unit: "m³",
            },
            {
                name: "Cubic Inch",
                value: 0.016387064,
                unit: "in³",
            },
            {
                name: "Cubic Foot",
                value: 28.316846592,
                unit: "ft³",
            },
            {
                name: "Cubic Yard",
                value: 764.554857984,
                unit: "yd³",
            },
            {
                name: "US Fluid Ounce",
                value: 0.0295735295625,
                unit: "fl oz",
            },
            {
                name: "US Cup",
                value: 0.2365882365,
                unit: "cup",
            },
            {
                name: "US Pint",
                value: 0.473176473,
                unit: "pt",
            },
            {
                name: "US Quart",
                value: 0.946352946,
                unit: "qt",
            },
            {
                name: "US Gallon",
                value: 3.785411784,
                unit: "gal",
            },
            {
                name: "US Barrel",
                value: 119.240471196,
                unit: "bbl",
            },
        ],
    },
    {
        name: "Mass",
        units: [
            {
                name: "Milligram",
                value: 0.000001,
                unit: "mg",
            },
            {
                name: "Gram",
                value: 0.001,
                unit: "g",
            },
            {
                name: "Kilogram",
                value: 1,
                unit: "kg",
            },
            {
                name: "Metric Ton",
                value: 1000,
                unit: "t",
            },
            {
                name: "Ounce",
                value: 0.028349523125,
                unit: "oz",
            },
            {
                name: "Pound",
                value: 0.45359237,
                unit: "lb",
            },
        ],
    },
    {
        name: "Speed",
        units: [
            {
                name: "Meter/Second",
                value: 1,
                unit: "m/s",
            },
            {
                name: "Kilometer/Hour",
                value: 0.27777777777778,
                unit: "km/h",
            },
            {
                name: "Mile/Hour",
                value: 0.44704,
                unit: "mi/h",
            },
            {
                name: "Knot",
                value: 0.51444444444444,
                unit: "kn",
            },
        ],
    },
    {
        name: "Time",
        units: [
            {
                name: "Second",
                value: 1,
                unit: "s",
            },
            {
                name: "Minute",
                value: 60,
                unit: "min",
            },
            {
                name: "Hour",
                value: 3600,
                unit: "h",
            },
            {
                name: "Day",
                value: 86400,
                unit: "d",
            },
            {
                name: "Week",
                value: 604800,
                unit: "week",
            },
            {
                name: "Month",
                value: 2629800,
                unit: "month",
            },
            {
                name: "Year",
                value: 31557600,
                unit: "year",
            },
        ],
    },
    {
        name: "Temperature",
        units: [
            {
                name: "Celsius",
                value: 1,
                unit: "°C",
            },
            {
                name: "Fahrenheit",
                value: 0.55555555555556,
                unit: "°F",
            },
            {
                name: "Kelvin",
                value: 1,
                unit: "K",
            },
        ],
    },
    {
        name: "Digital Storage",
        units: [
            {
                name: "Bit",
                value: 0.000000125,
                unit: "b",
            },
            {
                name: "Byte",
                value: 0.000001,
                unit: "B",
            },
            {
                name: "Kilobit",
                value: 0.000125,
                unit: "kb",
            },
            {
                name: "Kilobyte",
                value: 0.001,
                unit: "kB",
            },
            {
                name: "Megabit",
                value: 0.125,
                unit: "Mb",
            },
            {
                name: "Megabyte",
                value: 1,
                unit: "MB",
            },
            {
                name: "Gigabit",
                value: 125,
                unit: "Gb",
            },
            {
                name: "Gigabyte",
                value: 1000,
                unit: "GB",
            },

            {
                name: "Terabit",
                value: 125000,
                unit: "Tb",
            },
            {
                name: "Terabyte",
                value: 1000000,
                unit: "TB",
            },
            {
                name: "Petabit",
                value: 125000000,
                unit: "Pb",
            },
            {
                name: "Petabyte",
                value: 1000000000,
                unit: "PB",
            },
        ],
    },
    {
        name: "Energy",
        units: [
            {
                name: "Joule",
                value: 1,
                unit: "J",
            },
            {
                name: "Kilojoule",
                value: 1000,
                unit: "kJ",
            },
            {
                name: "Calorie",
                value: 4.184,
                unit: "cal",
            },
            {
                name: "Kilocalorie",
                value: 4184,
                unit: "kcal",
            },
            {
                name: "Watt Hour",
                value: 3600,
                unit: "Wh",
            },
            {
                name: "Kilowatt Hour",
                value: 3600000,
                unit: "kWh",
            },
            {
                name: "Electronvolt",
                value: 0.00000000000000000016021766208,
                unit: "eV",
            },
        ],
    },
    {
        name: "Pressure",
        units: [
            {
                name: "Pascal",
                value: 1,
                unit: "Pa",
            },
            {
                name: "Kilopascal",
                value: 1000,
                unit: "kPa",
            },
            {
                name: "Bar",
                value: 100000,
                unit: "bar",
            },
            {
                name: "Pound per Square Inch",
                value: 6894.757293168,
                unit: "psi",
            },
            {
                name: "Atmosphere",
                value: 101325,
                unit: "atm",
            },
            {
                name: "Torr",
                value: 133.32236842105,
                unit: "torr",
            },
        ],
    },
];

const Converter = () =>
{
    const [selectedConverter, setSelectedConverter] = useState(0);
    const [selectedUnits, setSelectedUnits] = useState([
        converters[selectedConverter].units[0],
        converters[selectedConverter].units[1],
    ]);

};