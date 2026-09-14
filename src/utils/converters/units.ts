import type { UnitDefinition } from '@/data/units'
import Decimal from 'decimal.js'

export function convertUnit(value: Decimal.Value, fromUnit: UnitDefinition, toUnit: UnitDefinition) {
  const decimalValue = new Decimal(value)
  return toUnit.fromBase(fromUnit.toBase(decimalValue))
}
