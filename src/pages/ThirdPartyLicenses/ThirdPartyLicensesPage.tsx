import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const qrcodegenLicense = `Copyright (c) Project Nayuki. (MIT License)
https://www.nayuki.io/page/qr-code-generator-library

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
- The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

const decimalJsLicense = `The MIT Licence.

Copyright (c) 2025 Michael Mclaughlin

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

export function ThirdPartyLicensesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-txt-main">
          Third-party licenses
        </h1>
        <p className="mt-2 text-txt-secondary">
          This website includes open-source software distributed under the following license.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>QR Code Generator Library</CardTitle>
          <p className="text-sm text-txt-secondary">
            Project Nayuki · MIT License ·{' '}
            <a
              href="https://www.nayuki.io/page/qr-code-generator-library"
              className="text-brand underline underline-offset-4 hover:text-brand-hover"
              target="_blank"
              rel="noreferrer"
            >
              Project page
            </a>
          </p>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-surface-subtle p-4 font-mono text-xs leading-relaxed text-txt-secondary">
            {qrcodegenLicense}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>decimal.js</CardTitle>
          <p className="text-sm text-txt-secondary">
            Michael Mclaughlin · MIT License ·{' '}
            <a
              href="https://github.com/MikeMcl/decimal.js"
              className="text-brand underline underline-offset-4 hover:text-brand-hover"
              target="_blank"
              rel="noreferrer"
            >
              Project page
            </a>
          </p>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-surface-subtle p-4 font-mono text-xs leading-relaxed text-txt-secondary">
            {decimalJsLicense}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
