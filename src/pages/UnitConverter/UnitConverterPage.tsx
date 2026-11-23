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
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
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
              <Combobox
                value={category}
                onValueChange={handleCategoryChange}
                items={UNIT_CATEGORY_OPTIONS.map((option) => option.value)}
                itemToStringLabel={(value) =>
                  UNIT_CATEGORY_OPTIONS.find((option) => option.value === value)?.label ??
                  value
                }
              >
                <ComboboxInput id="unit-category" className="w-full" />
                <ComboboxContent>
                  <ComboboxEmpty>No categories found.</ComboboxEmpty>
                  <ComboboxList>
                    {(value: string) => {
                      const option = UNIT_CATEGORY_OPTIONS.find(
                        (candidate) => candidate.value === value,
                      )

                      return (
                        <ComboboxItem key={value} value={value}>
                          {option?.label ?? value}
                        </ComboboxItem>
                      )
                    }}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
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
              <Combobox
                value={fromUnit.id}
                onValueChange={(value) => {
                  if (value !== null) setFromUnitId(value)
                }}
                items={unitOptions.map((option) => option.value)}
                itemToStringLabel={(value) =>
                  unitOptions.find((option) => option.value === value)?.label ?? value
                }
              >
                <ComboboxInput id="unit-from" className="w-full" />
                <ComboboxContent>
                  <ComboboxEmpty>No units found.</ComboboxEmpty>
                  <ComboboxList>
                    {(value: string) => {
                      const option = unitOptions.find(
                        (candidate) => candidate.value === value,
                      )

                      return (
                        <ComboboxItem key={value} value={value}>
                          {option?.label ?? value}
                        </ComboboxItem>
                      )
                    }}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="unit-to">To</FieldLabel>
              <Combobox
                value={toUnit.id}
                onValueChange={(value) => {
                  if (value !== null) setToUnitId(value)
                }}
                items={unitOptions.map((option) => option.value)}
                itemToStringLabel={(value) =>
                  unitOptions.find((option) => option.value === value)?.label ?? value
                }
              >
                <ComboboxInput id="unit-to" className="w-full" />
                <ComboboxContent>
                  <ComboboxEmpty>No units found.</ComboboxEmpty>
                  <ComboboxList>
                    {(value: string) => {
                      const option = unitOptions.find(
                        (candidate) => candidate.value === value,
                      )

                      return (
                        <ComboboxItem key={value} value={value}>
                          {option?.label ?? value}
                        </ComboboxItem>
                      )
                    }}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
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