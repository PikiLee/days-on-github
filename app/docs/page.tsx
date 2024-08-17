'use client'

import README from '~/README.md'

export default function Page() {
  return (
    <div className="prose lg:prose-xl container mx-auto py-10 md:py-20 px-5">
      <README />
    </div>
  )
}
