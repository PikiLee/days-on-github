'use client'

import { useForm } from 'react-hook-form'
import { Image, Tooltip } from '@nextui-org/react'
import { LuImagePlus } from 'react-icons/lu'
import { useState } from 'react'
import { IoCopyOutline } from 'react-icons/io5'
import AppCheckBox from './AppCheckBox'
import GraphColorSelector from './GraphColorSelector'
import AppButton from './AppButton'
import { toast } from './ui/use-toast'
import type { Tone } from '~/utils/colors'

interface Form {
  username: string
  includeDaysOnGithubText: boolean
  includeName: boolean
  includeAvatar: boolean
  tone: Tone
}

export default function GraphGenerator() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Form>()
  const [imageURL, setImageURL] = useState<string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: Form) => {
    setIsLoading(true)

    const url = new URL(`/v2/username/${data.username}`, window.location.origin)
    const include = []
    if (data.includeDaysOnGithubText)
      include.push('daysOnGithubText')
    if (data.includeName)
      include.push('name')
    if (data.includeAvatar)
      include.push('avatar')
    url.searchParams.set('include', include.join(','))
    url.searchParams.set('tone', data.tone)

    setImageURL(url.toString())
  }

  function copyURL() {
    navigator.clipboard.writeText(imageURL)
    toast({
      title: 'The URL has been copied to your clipboard.',
    })
  }

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-neutral-200">
            Generate Now
          </h2>

          <p className="mt-3 text-gray-600 dark:text-neutral-400">
            Generate the delightful Github contributions graph.
          </p>

          <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative z-10 flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
                <div className="w-full">
                  <label htmlFor="hs-search-article-1" className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">Github Username</span></label>
                  <input
                    type="text"
                    name="hs-search-article-1"
                    id="hs-search-article-1"
                    className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:outline-none border focus:border-green-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Github Username"
                    {...register('username', {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex gap-2">
                  <Tooltip content="Generate">
                    <AppButton type="submit" isLoading={isLoading}><LuImagePlus size={24} /></AppButton>
                  </Tooltip>
                  {imageURL && (
                    <Tooltip content="Copy URL">
                      <AppButton type="button" onClick={copyURL}><IoCopyOutline size={24} /></AppButton>
                    </Tooltip>
                  )}
                </div>
              </div>
            </form>

            <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
              <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
                <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
                <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
              </svg>
            </div>

            <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
              <svg className="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
              </svg>
            </div>
          </div>
          {errors.username && <p className="text-red-500 mt-1">Github Username is required</p>}

          <div className="mt-3 flex gap-8 justify-center items-center">
            <GraphColorSelector control={control} />
          </div>
          {errors.tone && <p className="text-red-500 mt-1">Tone is required</p>}

          <div className="mt-3">
            <label className="text-foreground-500 mb-1">Include additional contents</label>
            <div className="flex gap-8 justify-center items-center">
              <AppCheckBox name="includeDaysOnGithubText" control={control}>Days on Github Text</AppCheckBox>
              <AppCheckBox name="includeName" control={control}>Name</AppCheckBox>
              <AppCheckBox name="includeAvatar" control={control}>Avatar</AppCheckBox>
            </div>
          </div>

          <div className="flex justify-center mt-3">
            <Image src={imageURL} alt="" onLoad={() => setIsLoading(false)} onError={() => setIsLoading(false)} />
          </div>
        </div>
      </div>
    </div>
  )
}
