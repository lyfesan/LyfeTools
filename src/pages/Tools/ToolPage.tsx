import { useParams } from 'react-router'
import { TOOLS } from '@/data/tools'
import { ToolLayout } from '@/layouts/ToolLayout'
import Testing from '@/pages/TestingPages/Testing'
import { UnitConverter } from '@/pages/UnitConverter/UnitConverter'

export function ToolPage() {
  const { toolId } = useParams()
  const tool = TOOLS.find((item) => item.id === toolId)

  if (!tool) {
    return <p className="text-txt-secondary">Tool not found.</p>
  }

  let content: React.ReactNode

  switch (tool.id) {
    case 'unit-converter':
      content = <UnitConverter />
      break
    case 'testing':
      content = <Testing />
      break
    default:
      content = (
        <div>
          <h1 className="text-3xl font-bold text-txt-main">{tool.name}</h1>
          <p className="mt-2 text-txt-secondary">This tool is not implemented yet.</p>
        </div>
      )
  }

  return (
    <ToolLayout
      title={tool.name}
      description={tool.description}
    >
      {content}
    </ToolLayout>
  )
}