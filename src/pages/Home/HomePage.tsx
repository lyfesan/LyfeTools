import { Link } from 'react-router'
import { PATHS } from '@/routes/paths'

export function HomePage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-txt-main">
          Your Tools, Your Control
        </h1>
        <p className="mt-4 text-lg text-txt-secondary max-w-2xl mx-auto">
          LyfeTools provide convenient utility tools for your daily tasks and process it directly on your device without sending any data to the internet.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to={PATHS.TOOLS}
            className="rounded-full  bg-brand px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
          >
            Explore Tools
          </Link>
        </div>
      </section>
    </div>
  )
}
