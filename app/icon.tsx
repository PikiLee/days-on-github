import { ImageResponse } from 'next/og'
import { LuSquareStack } from 'react-icons/lu'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <LuSquareStack size={32} />
    ),
    {
      ...size,
    },
  )
}
