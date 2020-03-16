import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {},
})

export default function MasterPage ({routeProps}) {
  const classes = useStyles()
  const {match: {params = []} = {}} = routeProps
  return (
    <div>
      <Typography variant={'h1'}>Hacker News</Typography>
    </div>
  )
}
