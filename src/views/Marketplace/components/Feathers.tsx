import React from 'react'
import * as icons from 'react-feather'

export type IconName = keyof typeof icons

export type IconProps = {
  name: IconName
}

export function Icon({ name, ...rest }: IconProps) {
  const IconComponent = icons[name]
  return <IconComponent {...rest} color="#fff" />
}
