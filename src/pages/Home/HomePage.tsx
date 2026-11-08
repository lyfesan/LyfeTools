import { Link } from 'react-router'
import { PATHS } from '@/routes/paths'
import { Button } from '@/components/ui/button'

export function HomePage() {
  return (
    <div className="grow flex flex-col items-center justify-center">
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-txt-main">
          Your Tools, Your Control
        </h1>
        <p className="mt-4 text-lg text-txt-secondary max-w-2xl mx-auto">
          LyfeTools provide convenient utility tools for your daily tasks and process it directly on your device without sending any data to the internet.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button render={<Link to={PATHS.TOOLS} />} size="lg">
            Explore Tools
          </Button>
        </div>
      </section>
    </div>
  )
}
