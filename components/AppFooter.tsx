import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

export default function AppFooter() {
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">

      <div className="text-center">
        <div>
          <a className="flex-none text-xl font-semibold text-black dark:text-white" href="#" aria-label="Brand">Days on Github</a>
        </div>

        <div className="mt-3">
          <p className="text-gray-500 dark:text-neutral-500">Find me on</p>
        </div>

        <div className="mt-3 space-x-2">
          <Link className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" target="_blank" href="https://github.com/PikiLee">
            <FaGithub />
          </Link>
        </div>

      </div>

    </footer>
  )
}
