import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {},
})

const COMPONENTS = [
  {key: 'time', Component: ({value, ...props}) => <Typography {...props}>Time: {value}</Typography>},
  {key: 'title', Component: ({value, ...props}) => <Typography {...props}>Title: {value}</Typography>},
  {key: 'text', Component: ({value, ...props}) => <Typography {...props}>Text: {value}</Typography>},
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
