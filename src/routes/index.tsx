import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/layouts/RootLayout'
import { HomePage } from '@/pages/Home/HomePage'
import { ToolsPage } from '@/pages/Tools/ToolsPage'
import { ToolPage } from '@/pages/Tools/ToolPage'
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage'
import { PATHS } from './paths'

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'tools',
        element: <ToolsPage />,
      },
      {
        path: 'tools/:toolId',
        element: <ToolPage />,
      },
      {
        path: PATHS.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
])
