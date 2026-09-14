import type { IconType } from 'react-icons';

export type ToolStatus = 'Available' | 'Coming Soon' | 'Beta';

export interface ToolItem {
  id: string
  name: string
  description: string
  icon: string | IconType | React.FC<React.SVGProps<SVGSVGElement>>
  iconStyle: string
  tags: string[]
  status: ToolStatus
  path?: string
}
