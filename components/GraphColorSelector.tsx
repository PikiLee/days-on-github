import { Radio, RadioGroup } from '@nextui-org/react'
import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { backgroundColorClasses, tailwindColors } from '~/utils/colors'

export default function GraphColorSelector({
  control,
}: {
  control: Control<any, any>
}) {
  return (
    <Controller
      name="tone"
      control={control}
      rules={{ required: true }}
      defaultValue="green"
      render={({ field }) => (
        <RadioGroup
          label="Select your favorite color"
          color="default"
          orientation="horizontal"
          {...field}
        >
          {tailwindColors.map(color => (
            <Radio
              value={color}
              key={color}
              classNames={
                { wrapper: backgroundColorClasses[color][1] }
              }
            />
          ))}
        </RadioGroup>
      )}
    />
  )
}
