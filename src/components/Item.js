import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles({
  root: {},
})

const COMPONENTS = [
  {
    key: 'time',
    Component: ({value, ...props}) => (
      <Typography {...props} variant={'caption'}>{moment.unix(value).calendar()}</Typography>
    )
  },
  {
    key: 'title',
    Component: ({value, ...props}) => (
      <Typography {...props} variant="h5">{value}</Typography>
    )
  },
  {
    key: 'text',
    Component: ({value, ...props}) => (
      <Typography {...props}>Text: {value}</Typography>
    )
  },
]

export default function Item ({data = {}, minimized}) {
  const classes = useStyles()
  return (
    <div>
      {COMPONENTS.map(({key, Component}) => {
        return data[key] && <Component value={data[key]}/>
      })}
    </div>
  )
}
