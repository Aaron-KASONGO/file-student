import { Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

export const TitleTypography = ({children}) => {
  return (
    <Typography fontWeight='bold' fontSize={20} mb={2}>{children}</Typography>
  )
}

export const SubtitleTypography = ({children}) => {
    return (
      <Typography fontWeight="bold" mb={1}>{children}</Typography>
    )
}

export const TextTypography = ({children}) => {
    return (
      <Typography fontWeight="bold">{children}</Typography>
    )
}

export const NormalTypography = ({children}) => {
    return (
      <Typography>{children}</Typography>
    )
}

const propType = {
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
}

TitleTypography.propType = propType;

TextTypography.prototype = propType;

NormalTypography.prototype = propType

