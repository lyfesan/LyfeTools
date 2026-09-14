import { Link } from 'react-router'
import { PATHS } from '@/routes/paths'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <span className="text-6xl font-black text-brand">404</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-txt-main sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-base text-txt-secondary max-w-md">
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <div className="mt-8">
        <Link
          to={PATHS.HOME}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
