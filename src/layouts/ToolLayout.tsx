import { Link } from 'react-router'
import { FaArrowLeft } from "react-icons/fa6";
import { PATHS } from '@/routes/paths'


interface ToolLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-4">
      <div>
        <Link
          to={PATHS.TOOLS}
          className="text-sm text-brand hover:text-brand-hover"
        >
          <FaArrowLeft className="inline mr-2" />
          Back to tools
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-txt-main">
          {title}
        </h1>

        <p className="mt-2 text-txt-secondary">
          {description}
        </p>
      </div>

      <section>
        {children}
      </section>
    </div>
  )
}