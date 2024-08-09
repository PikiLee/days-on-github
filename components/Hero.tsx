import Image from 'next/image'
import ExampleYellow from '~/assets/example-yellow.png'
import ExampleGreen from '~/assets/example-green.png'
import ExampleSky from '~/assets/example-sky.png'

export default function Hero() {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 h-screen flex justify-center">
      <div className="grid md:grid-cols-2 gap-8 xl:gap-20 md:items-center">
        <div className="max-md:self-end">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight">
            Get your Github contributions graph with
            {' '}
            <span className="text-green-600">Days on Github</span>
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">Hand-picked colors and expertly crafted graph, designed for any kind of developers.</p>

          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <a className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
              Get started
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </a>
            <a className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
              API Docs
            </a>
          </div>
        </div>

        <div className="md:ms-4 max-md:self-start">
          <Image src={ExampleYellow} alt="Github contributions graph with yellow tone" />
          <Image src={ExampleGreen} alt="Github contributions graph with green tone" />
          <Image src={ExampleSky} alt="Github contributions graph with green tone" />
        </div>
      </div>
    </div>
  )
}
