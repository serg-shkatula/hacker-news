import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import URLDataRenderer from './URLDataRenderer'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {},
})

export default function MasterPage ({routeProps}) {
  const classes = useStyles()
  const {match: {params = []} = {}} = routeProps
  const dataUrl = (params[0] || '') === '' ? 'topstories' : params[0]
  return (
    <div>
      <Link to="/">
        <Typography variant={'h1'}>Hacker News</Typography>
      </Link>
      <URLDataRenderer url={dataUrl} title={'Top Stories'}/>
    </div>
  )
}
