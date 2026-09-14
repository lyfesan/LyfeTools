import { TOOLS } from '@/data/tools';
import { ToolCard } from '@/components/ToolCard'

export function ToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-txt-main">
          All Tools
        </h1>
        <p className="mt-2 text-txt-secondary">
          Select a utility to launch it or discover upcoming tools.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
