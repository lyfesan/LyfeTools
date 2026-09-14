import { useMemo, useState } from 'react'
import Decimal from 'decimal.js'
import { ComboBox } from '@/components/ComboBox'
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
    const formatUnitLabel = (unit: typeof units[number]) =>
        unit.symbol ? `${unit.name} (${unit.symbol})` : unit.name
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

    const unitOptions = useMemo(
        () => units.map((unit) => ({ value: unit.id, label: formatUnitLabel(unit) })),
        [units],
    )

    function handleCategoryChange(nextCategory: string) {
        const nextUnits = UNIT_CATEGORIES[nextCategory as UnitCategory]
        setCategory(nextCategory as UnitCategory)
        setFromUnitId(nextUnits[0].id)
        setToUnitId(nextUnits[1]?.id ?? nextUnits[0].id)
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-5">
                <ComboBox
                    label="Category"
                    className="w-full"
                    options={UNIT_CATEGORY_OPTIONS}
                    value={category}
                    onChange={handleCategoryChange}
                />

                <label className="block text-sm font-medium text-txt-main">
                    Value
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-2 text-txt-main outline-none focus:ring-2 focus:ring-brand"
                    />
                </label>
            </div>

            <div className="space-y-5">
                <ComboBox
                    label="From"
                    className="w-full"
                    options={unitOptions}
                    value={fromUnit.id}
                    onChange={setFromUnitId}
                />

                <ComboBox
                    label="To"
                    className="w-full"
                    options={unitOptions}
                    value={toUnit.id}
                    onChange={setToUnitId}
                />
            </div>

            <div className="min-w-0 rounded-lg bg-surface-subtle p-5 md:col-span-2">
                <p className="text-sm text-txt-secondary">Result</p>
                <p className="mt-2 min-w-0 break-all text-2xl font-semibold text-txt-main">
                    {result === null ? 'Enter a valid number' : `${result.toString()} ${toUnit.symbol ?? toUnit.name}`}
                </p>
            </div>
        </div>
    )
}