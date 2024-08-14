'use client'

import Link from 'next/link'
import { LuSquareStack } from 'react-icons/lu'
import { IoLogoGithub, IoMenuOutline } from 'react-icons/io5'
import { useState } from 'react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export default function AppHeader() {
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()
  const links = [{
    href: '/',
    label: 'Home',
    isActive: pathname === '/',
  }, {
    href: '/docs',
    label: 'Documentation',
    isActive: pathname === '/docs',
  }]

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-4 relative max-w-2xl w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-4 md:px-0 flex justify-between items-center">
          <div>
            <Link className="flex items-center w-max gap-1 rounded-md text-xl font-semibold focus:outline-none focus:opacity-80" href="/" aria-label="Days on Github">
              <LuSquareStack size={24} />
              Days on Github
            </Link>
          </div>

          <div className="md:hidden">
            <button type="button" className="flex justify-center items-center size-6 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setNavOpen(prev => !prev)}>
              <IoMenuOutline />
            </button>
          </div>
        </div>

        <div className={clsx('overflow-hidden transition-all duration-300 basis-full grow md:flex md:justify-end md:gap-4', navOpen ? 'block' : 'hidden')}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
            {links.map(({ href, label, isActive }) => (
              <Link className={clsx('py-0.5 md:py-3 px-4 md:px-1 md:border-s-0 border-gray-800 font-medium text-gray-800 focus:outline-none dark:border-neutral-200 dark:text-neutral-200', isActive && 'border-s-2 md:border-b-2')} key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
          <div className="before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2 dark:before:bg-neutral-700 flex max-md:justify-center max-md:mt-4 items-center relative pl-4">
            <Link href="https://github.com/PikiLee/days-on-github" target="_blank"><IoLogoGithub size={18} /></Link>
          </div>
        </div>
      </nav>
    </header>

  )
}
