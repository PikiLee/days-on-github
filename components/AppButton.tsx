import type { ButtonProps } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'

export default function AppButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button className={clsx('size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none', className)} {...props}>
      {children}
    </Button>
  )
}
