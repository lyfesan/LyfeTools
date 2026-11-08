import { useMemo, useState } from 'react'
import Decimal from 'decimal.js'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UNIT_CATEGORIES, UNIT_CATEGORY_OPTIONS, type UnitCategory } from '@/data/units'
import { convertUnit } from '@/utils/converters/units'

export function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length')
  const units = UNIT_CATEGORIES[category]
  const [fromUnitId, setFromUnitId] = useState(units[0].id)
  const [toUnitId, setToUnitId] = useState(units[1]?.id ?? units[0].id)
  const [inputValue, setInputValue] = useState('1')

  const fromUnit = units.find((unit) => unit.id === fromUnitId) ?? units[0]
  const toUnit = units.find((unit) => unit.id === toUnitId) ?? units[0]
  const unitOptions = useMemo(
    () => units.map((unit) => ({
      value: unit.id,
      label: unit.symbol ? `${unit.name} (${unit.symbol})` : unit.name,
    })),
    [units],
  )

  let result: Decimal | null = null
  try {
    if (inputValue.trim() !== '') {
      const decimalValue = new Decimal(inputValue)
      if (decimalValue.isFinite()) {
        result = convertUnit(inputValue, fromUnit, toUnit)
      }
    }
  } catch {
    result = null
  }
  const formattedResult = result?.toSignificantDigits(15).toString()

  function handleCategoryChange(value: string | null) {
    if (!value || !UNIT_CATEGORY_OPTIONS.some((option) => option.value === value)) return

    const nextCategory = value as UnitCategory
    const nextUnits = UNIT_CATEGORIES[nextCategory]
    setCategory(nextCategory)
    setFromUnitId(nextUnits[0].id)
    setToUnitId(nextUnits[1]?.id ?? nextUnits[0].id)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Convert units</CardTitle>
          <CardDescription>Choose a category, enter a value, and select the units to convert between.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field className="gap-2">
              <FieldLabel htmlFor="unit-category">Category</FieldLabel>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger id="unit-category" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNIT_CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="unit-value">Value</FieldLabel>
              <Input
                id="unit-value"
                type="number"
                step="any"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="unit-from">From</FieldLabel>
              <Select
                value={fromUnit.id}
                onValueChange={(value) => {
                  if (value !== null) setFromUnitId(value)
                }}
              >
                <SelectTrigger id="unit-from" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="unit-to">To</FieldLabel>
              <Select
                value={toUnit.id}
                onValueChange={(value) => {
                  if (value !== null) setToUnitId(value)
                }}
              >
                <SelectTrigger id="unit-to" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="py-5">
          <p className="text-sm text-muted-foreground">Result</p>
          <p className="mt-2 min-w-0 break-all text-2xl font-semibold text-foreground" aria-live="polite">
            {formattedResult === undefined ? 'Enter a valid number' : `${formattedResult} ${toUnit.symbol ?? toUnit.name}`}
          </p>
          {result !== null && (
            <>
              <FieldDescription className="mt-2">
                {inputValue} {fromUnit.symbol ?? fromUnit.name} = {formattedResult} {toUnit.symbol ?? toUnit.name}
              </FieldDescription>
              <FieldDescription className="mt-1">
                Rounded to 15 significant digits for display.
              </FieldDescription>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
