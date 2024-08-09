import { IoBrowsersOutline, IoColorPaletteOutline, IoDocumentTextOutline } from 'react-icons/io5'
import { BiCustomize } from 'react-icons/bi'

export default function IconSection() {
  return (

    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

      <div className="grid md:grid-cols-4 gap-6 lg:gap-12">
        <div className="flex gap-x-5 sm:gap-x-8">
          <IoColorPaletteOutline size={32} className="shrink-0 mt-2 text-gray-800 dark:text-white" />
          <div className="grow">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Colorful
            </h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
              Delight your audience with a colorful graph
            </p>
          </div>
        </div>

        <div className="flex gap-x-5 sm:gap-x-8">
          <IoDocumentTextOutline size={32} className="shrink-0 mt-2 text-gray-800 dark:text-white" />
          <div className="grow">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Customizable
            </h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
              The graph is easily customized and extendable
            </p>
          </div>
        </div>

        <div className="flex gap-x-5 sm:gap-x-8">
          <BiCustomize size={32} className="shrink-0 mt-2 text-gray-800 dark:text-white" />
          <div className="grow">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Documentation
            </h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
              The API is well documented
            </p>
          </div>
        </div>

        <div className="flex gap-x-5 sm:gap-x-8">
          <IoBrowsersOutline size={32} className="shrink-0 mt-2 text-gray-800 dark:text-white" />
          <div className="grow">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
              UI
            </h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
              The tool is also available in a user interface.
            </p>
          </div>
        </div>

      </div>

    </div>

  )
}
