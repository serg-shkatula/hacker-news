import { Typography } from '@material-ui/core'
import UnstyledLink from './UnstyledLink'
import React from 'react'

export default function ({className, textClassName}) {
  return (
    <UnstyledLink to="/" className={className}>
      <Typography variant={'h1'} className={textClassName}>
        Hacker News
      </Typography>
    </UnstyledLink>
  )
}
