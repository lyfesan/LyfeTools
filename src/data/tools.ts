import type { ToolItem } from '@/types/tool'
import { LuImage, LuRuler, LuTimer } from 'react-icons/lu'
//import { TiDocumentText } from "react-icons/ti";
import { CgFileDocument } from "react-icons/cg";
//import { HiOutlineDocumentText } from "react-icons/hi";
// import { GoTools } from 'react-icons/go'
import { FaQrcode } from 'react-icons/fa6'

export const TOOLS: ToolItem[] = [
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert any units of measurement.',
    icon: LuRuler,
    iconStyle: 'text-brand dark:text-brand-light',
    tags: ['Utilities'],
    status: 'Beta',
    path: '/tools/unit-converter',
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert any types of images.',
    icon: LuImage,
    iconStyle: 'text-brand dark:text-brand-light',
    tags: ['Utilities'],
    status: 'Coming Soon',
    path: '/tools/image-converter',
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'Focus timer with customizable intervals and sound notifications.',
    icon: LuTimer,
    iconStyle: 'text-brand dark:text-brand-light',
    tags: ['Productivity'],
    status: 'Coming Soon',
  },
  {
    id: 'qrcode-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for any text or URL.',
    icon: FaQrcode,
    iconStyle: 'text-brand dark:text-brand-light',
    tags: ['Utilities'],
    status: 'Coming Soon',
    path: '/tools/qrcode-generator',
  },
  {
    id: 'document-converter',
    name: 'Document Converter',
    description: 'Convert documents between different formats.',
    icon: CgFileDocument,
    iconStyle: 'text-brand dark:text-brand-light',
    tags: ['Utilities'],
    status: 'Coming Soon',
    path: '/tools/document-converter',
  }
  /*
  {
    id: 'testing',
    name: 'Testing',
    description: 'Testing tool page for components.',
    icon: GoTools,
    iconStyle: 'text-brand dark:text-brand-light',
    tags: ['Development'],
    status: 'Beta',
    path: '/tools/testing',
  },
  */
]