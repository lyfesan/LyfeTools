import { Link } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TOOLS } from '@/data/tools'

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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TOOLS.map((tool) => {
          const isComingSoon = tool.status === 'Coming Soon'
          const statusClass = tool.status === 'Available'
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
            : tool.status === 'Beta'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
              : 'bg-muted text-muted-foreground'
          const Icon = typeof tool.icon === 'string' ? null : tool.icon

          const card = (
            <Card
              className={`h-full transition duration-200 ${
                isComingSoon
                  ? 'opacity-70'
                  : 'group hover:ring-foreground/20 hover:shadow-md'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <div className="flex size-10 items-center justify-center">
                  {typeof tool.icon === 'string' ? (
                    <img
                      src={tool.icon}
                      alt=""
                      className="size-7 object-contain"
                    />
                  ) : Icon ? (
                    <Icon
                      aria-hidden="true"
                      className={`size-7 transition group-hover:scale-105 ${tool.iconStyle ?? ''}`}
                    />
                  ) : null}
                </div>
                {tool.status !== 'Available' && (
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}>
                    {tool.status}
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <CardTitle className={`text-lg font-bold transition-colors ${
                  isComingSoon ? '' : 'group-hover:text-brand'
                }`}>
                  {tool.name}
                </CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-txt-secondary">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          )

          return (
            <div key={tool.id} className="h-full">
              {!isComingSoon && tool.path ? (
                <Link
                  to={tool.path}
                  className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  aria-label={`Open ${tool.name}`}
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
