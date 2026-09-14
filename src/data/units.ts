import Decimal from 'decimal.js'

Decimal.set({ precision: 50 })

export type UnitCategory = 'time' | 'length' | 'mass' | 'temperature' | 'current'

export interface UnitDefinition {
  id: string
  name: string
  symbol?: string
  toBase: (value: Decimal) => Decimal
  fromBase: (value: Decimal) => Decimal
}

const ASTRONOMICAL_UNIT_IN_METERS = new Decimal('149597870700')
const PI = Decimal.acos(-1)
const ARCSECOND_IN_RADIANS = PI.div(180).div(3600)
const PARSEC_IN_METERS = ASTRONOMICAL_UNIT_IN_METERS.div(ARCSECOND_IN_RADIANS.tan())

export const UNIT_CATEGORIES: Record<UnitCategory, UnitDefinition[]> = {
  time: [
    { id: 'second', name: 'Second', symbol: 's', toBase: (value) => value, fromBase: (value) => value },
    { id: 'minute', name: 'Minute', symbol: 'min', toBase: (value) => value.mul(60), fromBase: (value) => value.div(60) },
    { id: 'hour', name: 'Hour', symbol: 'h', toBase: (value) => value.mul(3600), fromBase: (value) => value.div(3600) },
    { id: 'day', name: 'Day', symbol: 'd', toBase: (value) => value.mul(86400), fromBase: (value) => value.div(86400) },
    { id: 'week', name: 'Week', symbol: 'wk', toBase: (value) => value.mul(604800), fromBase: (value) => value.div(604800) },
    { id: 'month', name: 'Month', symbol: 'mo', toBase: (value) => value.mul(2629800), fromBase: (value) => value.div(2629800) },
    { id: 'year', name: 'Year', symbol: 'yr', toBase: (value) => value.mul(31557600), fromBase: (value) => value.div(31557600) },
    { id: 'decade', name: 'Decade', symbol: 'dec', toBase: (value) => value.mul(315576000), fromBase: (value) => value.div(315576000) },
    { id: 'century', name: 'Century', symbol: 'cent', toBase: (value) => value.mul(3155760000), fromBase: (value) => value.div(3155760000) },
    { id: 'millennium', name: 'Millennium', symbol: 'mill', toBase: (value) => value.mul(31557600000), fromBase: (value) => value.div(31557600000) },
    { id: 'semester', name: 'Semester', symbol: 'sem', toBase: (value) => value.mul(15778800), fromBase: (value) => value.div(15778800) },
    { id: 'fortnight', name: 'Fortnight', symbol: 'fn', toBase: (value) => value.mul(1209600), fromBase: (value) => value.div(1209600) },
    { id: 'microsecond', name: 'Microsecond', symbol: 'µs', toBase: (value) => value.div(1_000_000), fromBase: (value) => value.mul(1_000_000) },
    { id: 'millisecond', name: 'Millisecond', symbol: 'ms', toBase: (value) => value.div(1000), fromBase: (value) => value.mul(1000) },
  ],
  length: [
    { id: 'meter', name: 'Meter', symbol: 'm', toBase: (value) => value, fromBase: (value) => value },
    { id: 'kilometer', name: 'Kilometer', symbol: 'km', toBase: (value) => value.mul(1000), fromBase: (value) => value.div(1000) },
    { id: 'attometer', name: 'Attometer', symbol: 'am', toBase: (value) => value.mul('1e-18'), fromBase: (value) => value.div('1e-18') },
    { id: 'femtometer', name: 'Femtometer', symbol: 'fm', toBase: (value) => value.mul('1e-15'), fromBase: (value) => value.div('1e-15') },
    { id: 'picometer', name: 'Picometer', symbol: 'pm', toBase: (value) => value.mul('1e-12'), fromBase: (value) => value.div('1e-12') },
    { id: 'nanometer', name: 'Nanometer', symbol: 'nm', toBase: (value) => value.mul('1e-9'), fromBase: (value) => value.div('1e-9') },
    { id: 'micrometer', name: 'Micrometer', symbol: 'µm', toBase: (value) => value.mul('1e-6'), fromBase: (value) => value.div('1e-6') },
    { id: 'millimeter', name: 'Millimeter', symbol: 'mm', toBase: (value) => value.mul('1e-3'), fromBase: (value) => value.div('1e-3') },
    { id: 'centimeter', name: 'Centimeter', symbol: 'cm', toBase: (value) => value.mul('1e-2'), fromBase: (value) => value.div('1e-2') },
    { id: 'decimeter', name: 'Decimeter', symbol: 'dm', toBase: (value) => value.mul('1e-1'), fromBase: (value) => value.div('1e-1') },
    { id: 'decameter', name: 'Decameter', symbol: 'dam', toBase: (value) => value.mul(10), fromBase: (value) => value.div(10) },
    { id: 'hectometer', name: 'Hectometer', symbol: 'hm', toBase: (value) => value.mul(100), fromBase: (value) => value.div(100) },
    { id: 'megameter', name: 'Megameter', symbol: 'Mm', toBase: (value) => value.mul('1e6'), fromBase: (value) => value.div('1e6') },
    { id: 'gigameter', name: 'Gigameter', symbol: 'Gm', toBase: (value) => value.mul('1e9'), fromBase: (value) => value.div('1e9') },
    { id: 'terameter', name: 'Terameter', symbol: 'Tm', toBase: (value) => value.mul('1e12'), fromBase: (value) => value.div('1e12') },
    { id: 'petameter', name: 'Petameter', symbol: 'Pm', toBase: (value) => value.mul('1e15'), fromBase: (value) => value.div('1e15') },
    { id: 'exameter', name: 'Exameter', symbol: 'Em', toBase: (value) => value.mul('1e18'), fromBase: (value) => value.div('1e18') },
    { id: 'inch', name: 'Inch', symbol: 'in', toBase: (value) => value.mul('0.0254'), fromBase: (value) => value.div('0.0254') },
    { id: 'yard', name: 'Yard', symbol: 'yd', toBase: (value) => value.mul('0.9144'), fromBase: (value) => value.div('0.9144') },
    { id: 'mile', name: 'Mile', symbol: 'mi', toBase: (value) => value.mul('1609.344'), fromBase: (value) => value.div('1609.344') },
    { id: 'nautical-mile', name: 'Nautical Mile', symbol: 'nmi', toBase: (value) => value.mul('1852'), fromBase: (value) => value.div('1852') },
    { id: 'astronomical-unit', name: 'Astronomical Unit', symbol: 'au', toBase: (value) => value.mul(ASTRONOMICAL_UNIT_IN_METERS), fromBase: (value) => value.div(ASTRONOMICAL_UNIT_IN_METERS) },
    { id: 'light-year', name: 'Light-year', symbol: 'ly', toBase: (value) => value.mul('9460730472580800'), fromBase: (value) => value.div('9460730472580800') },
    { id: 'parsec', name: 'Parsec', symbol: 'pc', toBase: (value) => value.mul(PARSEC_IN_METERS), fromBase: (value) => value.div(PARSEC_IN_METERS) },
  ],
  mass: [
    { id: 'kilogram', name: 'Kilogram', symbol: 'kg', toBase: (value) => value, fromBase: (value) => value },
    { id: 'gram', name: 'Gram', symbol: 'g', toBase: (value) => value.mul('1e-3'), fromBase: (value) => value.mul('1e-3') },
    { id: 'attogram', name: 'Attogram', symbol: 'ag', toBase: (value) => value.mul('1e-21'), fromBase: (value) => value.div('1e-21') },
    { id: 'femtogram', name: 'Femtogram', symbol: 'fg', toBase: (value) => value.mul('1e-18'), fromBase: (value) => value.div('1e-18') },
    { id: 'picogram', name: 'Picogram', symbol: 'pg', toBase: (value) => value.mul('1e-15'), fromBase: (value) => value.div('1e-15') },
    { id: 'nanogram', name: 'Nanogram', symbol: 'ng', toBase: (value) => value.mul('1e-12'), fromBase: (value) => value.div('1e-12') },
    { id: 'microgram', name: 'Microgram', symbol: 'µg', toBase: (value) => value.mul('1e-9'), fromBase: (value) => value.div('1e-9') },
    { id: 'milligram', name: 'Milligram', symbol: 'mg', toBase: (value) => value.mul('1e-6'), fromBase: (value) => value.div('1e-6') },
    { id: 'centimeter', name: 'Centimeter', symbol: 'cg', toBase: (value) => value.mul('1e-5'), fromBase: (value) => value.div('1e-5') },
    { id: 'decimeter', name: 'Decimeter', symbol: 'dg', toBase: (value) => value.mul('1e-4'), fromBase: (value) => value.div('1e-4') },
    { id: 'decagram', name: 'Decagram', symbol: 'dag', toBase: (value) => value.mul('1e-2'), fromBase: (value) => value.div('1e-2') },
    { id: 'hectogram', name: 'Hectogram', symbol: 'hg', toBase: (value) => value.mul('1e-1'), fromBase: (value) => value.div('1e-1') },
    { id: 'megagram', name: 'Megagram', symbol: 'Mg', toBase: (value) => value.mul('1e3'), fromBase: (value) => value.div('1e3') },
    { id: 'gigagram', name: 'Gigagram', symbol: 'Gg', toBase: (value) => value.mul('1e6'), fromBase: (value) => value.div('1e6') },
    { id: 'teragram', name: 'Teragram', symbol: 'Tg', toBase: (value) => value.mul('1e9'), fromBase: (value) => value.div('1e9') },
    { id: 'petagram', name: 'Petagram', symbol: 'Pg', toBase: (value) => value.mul('1e12'), fromBase: (value) => value.div('1e12') },
    { id: 'exameter', name: 'Exameter', symbol: 'Eg', toBase: (value) => value.mul('1e15'), fromBase: (value) => value.div('1e15') },
    { id: 'pound', name: 'Pound', symbol: 'lbs', toBase: (value) => value.mul('2.2046226218'), fromBase: (value) => value.div('2.2046226218') },
    { id: 'ounce', name: 'Ounce', symbol: 'oz', toBase: (value) => value.mul('35.2739619496'), fromBase: (value) => value.div('35.2739619496') },
    { id: 'metric-ton', name: 'Metric Ton', symbol: 't', toBase: (value) => value.mul('1e-3'), fromBase: (value) => value.div('1e-3') },
  ],
  temperature: [
    { id: 'celsius', name: 'Celsius', symbol: '°C', toBase: (value) => value, fromBase: (value) => value },
    { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', toBase: (value) => value.minus(32).mul(5).div(9), fromBase: (value) => value.mul(9).div(5).plus(32) },
    { id: 'kelvin', name: 'Kelvin', symbol: 'K', toBase: (value) => value.minus('273.15'), fromBase: (value) => value.plus('273.15') },
    { id: 'reaumur', name: 'Réaumur', symbol: '°Ré', toBase: (value) => value.mul('1.25'), fromBase: (value) => value.mul('0.8') },
    { id: 'rankine', name: 'Rankine', symbol: '°Ra', toBase: (value) => value.mul(5).div(9).minus('273.15'), fromBase: (value) => value.plus('273.15').mul(9).div(5) },
  ],
  current: [
    { id: 'ampere', name: 'Ampere', symbol: 'A', toBase: (value) => value, fromBase: (value) => value },
    { id: 'milliampere', name: 'Milliampere', symbol: 'mA', toBase: (value) => value.mul('1e-3'), fromBase: (value) => value.div('1e-3') },
    { id: 'microampere', name: 'Microampere', symbol: 'µA', toBase: (value) => value.mul('1e-6'), fromBase: (value) => value.div('1e-6') },
    { id: 'kiloampere', name: 'Kiloampere', symbol: 'kA', toBase: (value) => value.mul('1e3'), fromBase: (value) => value.div('1e3') },
  ],
}

export const UNIT_CATEGORY_OPTIONS = Object.keys(UNIT_CATEGORIES).map((id) => ({
  value: id,
  label: id.charAt(0).toUpperCase() + id.slice(1),
}))
