import type { ToolItem } from '@/types/tool'
import { Link } from 'react-router'

interface ToolCardProps {
  tool: ToolItem
}

function CardLink({
  isComingSoon,
  path,
  children,
}: {
  isComingSoon: boolean
  path?: string
  children: React.ReactNode
}) {
  if (isComingSoon || !path) {
    return <div className="h-full flex flex-col">{children}</div>
  }

  return (
    <Link to={path} className="h-full flex flex-col">
      {children}
    </Link>
  )
}

export function ToolCard({ tool }: ToolCardProps) {
  const isComingSoon = tool.status === 'Coming Soon'

  const statusBadgeClass = () => {
    switch (tool.status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
      case 'Beta':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
      default:
        return 'bg-surface-subtle text-txt-muted'
    }
  }

  return (
    <CardLink isComingSoon={isComingSoon} path={tool.path}>
      <div
        className={`flex flex-col justify-between h-full p-6 rounded-2xl border border-border bg-surface shadow-xs transition duration-200 ${isComingSoon
          ? 'opacity-70 cursor-not-allowed'
          : 'group cursor-pointer hover:border-border-hover hover:shadow-md'
          }`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div
              className={`rounded-xl transition inline-flex items-center justify-center ${!isComingSoon ? 'group-hover:scale-105' : ''
                }`}
            >
              {typeof tool.icon === 'string' ? (
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-7 h-7 object-contain"
                />
              ) : (
                (() => {
                  const IconComponent = tool.icon;
                  return <IconComponent className={`w-7 h-7 ${tool.iconStyle ?? ''}`} />;
                })()
              )}
            </div>
            {tool.status !== 'Available' && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadgeClass()}`}>
                {tool.status}
              </span>
            )}
          </div>

          <h2
            className={`text-lg font-bold text-txt-main transition-colors ${!isComingSoon ? 'group-hover:text-brand' : ''
              }`}
          >
            {tool.name}
          </h2>
          <p className="mt-2 text-sm text-txt-secondary leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>
    </CardLink>
  )
}