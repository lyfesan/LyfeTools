import { useMemo, useState } from 'react'
import { qrcodegen } from '@/utils/qrcodegen/qrcodegen'
import { FaChevronDown } from "react-icons/fa6";
import { Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const errorCorrectionOptions = [
    { value: "L", label: "Low (7%)" },
    { value: "M", label: "Medium (15%)" },
    { value: "Q", label: "Quartile (25%)" },
    { value: "H", label: "High (30%)" },
]

const errorCorrectionLevels: Record<string, qrcodegen.QrCode.Ecc> = {
    L: qrcodegen.QrCode.Ecc.LOW,
    M: qrcodegen.QrCode.Ecc.MEDIUM,
    Q: qrcodegen.QrCode.Ecc.QUARTILE,
    H: qrcodegen.QrCode.Ecc.HIGH,
}

function createQrSvg(qrCode: qrcodegen.QrCode) {
    const quietZone = 4
    const size = qrCode.size + quietZone * 2
    let path = ""

    for (let y = 0; y < qrCode.size; y++) {
        for (let x = 0; x < qrCode.size; x++) {
            if (qrCode.getModule(x, y)) {
                path += `M${x + quietZone},${y + quietZone}h1v1h-1z`
            }
        }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${path}" fill="#000"/></svg>`
}

async function downloadQrRaster(svg: string, format: "png" | "jpg") {
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }))
    const mimeType = format === "jpg" ? "image/jpeg" : "image/png"

    try {
        const image = new Image()
        image.src = svgUrl
        await image.decode()

        const canvas = document.createElement("canvas")
        canvas.width = 1024
        canvas.height = 1024
        const context = canvas.getContext("2d")

        if (!context) {
            throw new Error(`Could not create a canvas context for the ${format.toUpperCase()} download.`)
        }

        context.imageSmoothingEnabled = false
        context.drawImage(image, 0, 0, canvas.width, canvas.height)

        const imageBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob)
                else reject(new Error(`Could not encode the QR code as ${format.toUpperCase()}.`))
            }, mimeType)
        })

        const imageUrl = URL.createObjectURL(imageBlob)
        const link = document.createElement("a")
        link.href = imageUrl
        link.download = `lyfetools-qrcode.${format}`
        link.click()
        window.setTimeout(() => URL.revokeObjectURL(imageUrl), 1000)
    } finally {
        URL.revokeObjectURL(svgUrl)
    }
}

export function QrCodeGenerator() {
    const [errorCorrection, setErrorCorrection] = useState("M")
    const [boostErrorCorrection, setBoostErrorCorrection] = useState(true)
    const [maskPattern, setMaskPattern] = useState("-1")
    const [text, setText] = useState("")
    const [downloadFormat, setDownloadFormat] = useState<"png" | "jpg" | "svg">("png")
    const [downloadError, setDownloadError] = useState<string | null>(null)
    const qrResult = useMemo(() => {
        if (!text.trim()) return null

        try {
            const qrCode = qrcodegen.QrCode.encodeSegments(
                qrcodegen.QrSegment.makeSegments(text),
                errorCorrectionLevels[errorCorrection],
                1,
                40,
                Number(maskPattern),
                boostErrorCorrection,
            )

            return {
                svg: createQrSvg(qrCode),
                version: qrCode.version,
                mask: qrCode.mask,
                errorCorrection: errorCorrectionOptions[qrCode.errorCorrectionLevel.ordinal].label,
                error: null,
            }
        } catch (error) {
            if (error instanceof RangeError && error.message === "Data too long") {
                return {
                    svg: null,
                    version: null,
                    mask: null,
                    error: "The text is too long to encode as a QR code with these settings.",
                }
            }

            throw error
        }
    }, [boostErrorCorrection, errorCorrection, maskPattern, text])

    const handleDownload = async () => {
        if (!qrResult?.svg) return

        setDownloadError(null)
        try {
            if (downloadFormat === "png" || downloadFormat === "jpg") {
                await downloadQrRaster(qrResult.svg, downloadFormat)
            } else {
                const url = URL.createObjectURL(
                    new Blob([qrResult.svg], { type: "image/svg+xml" }),
                )
                const link = document.createElement("a")
                link.href = url
                link.download = "lyfetools-qrcode.svg"
                link.click()
                window.setTimeout(() => URL.revokeObjectURL(url), 1000)
            }
        } catch (error) {
            setDownloadError(
                error instanceof Error
                    ? `${downloadFormat.toUpperCase()} download failed: ${error.message}`
                    : `${downloadFormat.toUpperCase()} download failed for an unknown reason.`,
            )
        }
    }

    return (
        <Card>
            <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)]">
                    <div className="md:col-start-2 md:row-start-1">
                        <Card className="rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-sm">QR Code Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-3 text-sm text-muted-foreground" aria-live="polite">
                            {qrResult?.error ? (
                                <p role="alert" className="py-12 text-center text-destructive">
                                    {qrResult.error}
                                </p>
                            ) : qrResult?.svg ? (
                                <>
                                    <img
                                        src={`data:image/svg+xml,${encodeURIComponent(qrResult.svg)}`}
                                        alt="Generated QR code"
                                        className="size-64 max-w-full"
                                    />
                                    <dl className="grid w-full grid-cols-2 gap-x-4 gap-y-3 rounded-lg border bg-muted/30 p-3">
                                        <div>
                                            <dt className="text-xs text-muted-foreground">Version</dt>
                                            <dd className="font-medium text-foreground">{qrResult.version}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs text-muted-foreground">Mask pattern</dt>
                                            <dd className="font-medium text-foreground">{qrResult.mask}</dd>
                                        </div>
                                        <div className="col-span-2">
                                            <dt className="text-xs text-muted-foreground">Error correction</dt>
                                            <dd className="font-medium text-foreground">
                                                {qrResult.errorCorrection}
                                            </dd>
                                        </div>
                                    </dl>
                                </>
                            ) : (
                                <p className="py-12 text-center">
                                    Enter text or a web URL to generate your QR code.
                                </p>
                            )}
                        </CardContent>
                        </Card>
                    </div>

                    {/* 2. COLLAPSIBLES (Mobile: Middle | Desktop: Left Column) */}
                    {/* md:row-span-2 allows it to stretch down the left side alongside the right-side items */}
                    <div className="flex flex-col gap-4 md:col-start-1 md:row-start-1 md:row-span-2">
                        <Collapsible defaultOpen={true} className="border rounded-lg p-4">
                            <CollapsibleTrigger render={<Button variant="ghost" size="sm" className="w-full justify-between text-base">
                                CONTENT
                                <FaChevronDown className="ml-auto group-data-panel-open/button:rotate-180" /></Button>}>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2 px-4 pt-2 text-sm">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel>
                                            Enter Text
                                        </FieldLabel>
                                        <Textarea
                                            value={text}
                                            onChange={(event) => setText(event.target.value)}
                                            placeholder="Enter text or web URL to be put on your QR code"
                                        />
                                        <FieldDescription>
                                            Your QR code will be generated automatically.
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </CollapsibleContent>
                        </Collapsible>
                        
                        <Collapsible className="border rounded-lg p-4">
                            <CollapsibleTrigger render={<Button variant="ghost" className="w-full justify-between text-base">
                                ADVANCED OPTIONS
                                <FaChevronDown className="ml-auto group-data-panel-open/button:rotate-180" /></Button>}>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2 px-4 pt-2 text-sm">
                                <FieldGroup className="gap-6">
                                    <FieldSet className="gap-3">
                                        <FieldLegend variant="label">Error Correction Level</FieldLegend>
                                        <FieldDescription>
                                            Choose one level.
                                        </FieldDescription>
                                        <RadioGroup
                                            value={errorCorrection}
                                            onValueChange={setErrorCorrection}
                                            className="gap-2"
                                        >
                                            {errorCorrectionOptions.map(({ value, label }) => {
                                                const id = `error-correction-${value}`

                                                return (
                                                    <div key={value} className="flex items-center gap-3">
                                                        <RadioGroupItem id={id} value={value} />
                                                        <FieldLabel htmlFor={id} className="text-sm">{label}</FieldLabel>
                                                    </div>
                                                )
                                            })}
                                        </RadioGroup>
                                    </FieldSet>
                                    <FieldSet className="gap-3">
                                        <FieldLegend variant="label">Error Correction Boost</FieldLegend>
                                        <div className="flex items-start gap-3">
                                            <input
                                                id="boost-error-correction"
                                                type="checkbox"
                                                checked={boostErrorCorrection}
                                                onChange={(event) => setBoostErrorCorrection(event.target.checked)}
                                                className="mt-1 size-4 shrink-0 accent-primary"
                                            />
                                            <div className="flex flex-col gap-1">
                                                <FieldLabel htmlFor="boost-error-correction">
                                                    Boost when possible
                                                </FieldLabel>
                                                <FieldDescription>
                                                    Increase error correction if it fits without increasing the QR code version.
                                                </FieldDescription>
                                            </div>
                                        </div>
                                    </FieldSet>
                                    <FieldSet className="gap-3">
                                        <FieldLegend variant="label">Mask Pattern</FieldLegend>
                                        <FieldDescription>
                                            Choose a pattern from 0 to 7, or let the generator choose automatically (-1).
                                        </FieldDescription>
                                        <Select
                                            value={maskPattern}
                                            onValueChange={(value) => {
                                                if (value !== null) setMaskPattern(value)
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Choose a mask pattern" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="-1">Automatic</SelectItem>
                                                {Array.from({ length: 8 }, (_, pattern) => (
                                                    <SelectItem key={pattern} value={String(pattern)}>
                                                        Pattern {pattern}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FieldSet>
                                </FieldGroup>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    <div className="md:col-start-2 md:row-start-2 self-end">
                        <div className="flex w-full overflow-hidden rounded-4xl bg-primary shadow-sm">
                            <Button
                                className="h-10 flex-1 justify-center rounded-none border-0 bg-transparent text-primary-foreground hover:bg-primary/80"
                                disabled={!qrResult?.svg}
                                onClick={handleDownload}
                            >
                                <Download aria-hidden="true" />
                                Download {downloadFormat.toUpperCase()}
                            </Button>
                            <Select
                                value={downloadFormat}
                                onValueChange={(value) => {
                                    if (value === "png" || value === "jpg" || value === "svg") {
                                        setDownloadFormat(value)
                                    }
                                }}
                            >
                                <SelectTrigger
                                    className="h-10 w-11 shrink-0 rounded-none border-0 border-l border-primary-foreground/20 bg-transparent px-3 text-primary-foreground hover:bg-primary/80 [&_svg]:text-primary-foreground"
                                    aria-label={`Download format: ${downloadFormat.toUpperCase()}`}
                                    disabled={!qrResult?.svg}
                                >
                                    <SelectValue className="sr-only" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="png">PNG</SelectItem>
                                    <SelectItem value="jpg">JPG</SelectItem>
                                    <SelectItem value="svg">SVG</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {downloadError && (
                            <p role="alert" className="mt-2 text-sm text-destructive">
                                {downloadError}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
