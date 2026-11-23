import { useState } from "react"
import {
  // FieldDescription,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

const isHexColor = (value: string) => /^#[\da-f]{6}$/i.test(value)

export function ColorPickerField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const [hex, setHex] = useState(value)
  const isValid = isHexColor(hex)

  return (
    <FieldSet className="gap-3">
      <FieldLegend variant="label">{label}</FieldLegend>
      <InputGroup>
        <InputGroupAddon
          align="inline-start"
          className="h-full shrink-0 py-0 pl-1"
          onClick={(event) => event.stopPropagation()}
        >
          <Input
            type="color"
            value={value}
            aria-label={`Choose ${label.toLowerCase()}`}
            className="color-picker-input size-6 shrink-0 cursor-pointer rounded-full border-0 bg-transparent p-0"
            onChange={(event) => {
              setHex(event.target.value)
              onChange(event.target.value)
            }}
          />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          type="text"
          value={hex}
          maxLength={7}
          placeholder="#000000"
          spellCheck={false}
          aria-label={`${label} hex code`}
          aria-invalid={!isValid}
          onChange={(event) => {
            const nextHex = event.target.value
            setHex(nextHex)
            if (isHexColor(nextHex)) onChange(nextHex)
          }}
        />
      </InputGroup>
      {/* <FieldDescription>
        Enter a 6-digit hex code or use the color picker.
      </FieldDescription> */}
      {!isValid && (
        <p className="text-sm text-destructive" role="alert">
          Enter a valid hex color, such as #3366FF.
        </p>
      )}
    </FieldSet>
  )
}
