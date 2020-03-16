import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import URLDataRenderer from './URLDataRenderer'
import UnstyledLink from './UnstyledLink'
import { unit } from '../styles'

const useStyles = makeStyles({
  root: {
    padding: unit * 2,
    boxSizing: 'border-box'
  },
})

export default function MasterPage ({routeProps}) {
  const classes = useStyles()
  const {match: {params = {}} = {}} = routeProps
  let url = params[0]
  const showTopStories = (url || '') === ''
  showTopStories && (url = 'topstories')

  return (
    <div className={classes.root}>
      <UnstyledLink to="/">
        <Typography variant={'h1'}>Hacker News</Typography>
      </UnstyledLink>
      <URLDataRenderer url={url} title={showTopStories && 'Top Stories'} quickView={showTopStories}/>
    </div>
  )
}
