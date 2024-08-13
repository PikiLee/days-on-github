import { Checkbox } from '@nextui-org/react'
import { type Control, Controller } from 'react-hook-form'
import { IoAdd } from 'react-icons/io5'

export default function AppCheckBox({
  children,
  name,
  control,
}: {
  children: React.ReactNode
  name: string
  control: Control<any, any>

}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox {...field} radius="lg" icon={<IoAdd />}>
          {children}
        </Checkbox>
      )}
    />
  )
}
