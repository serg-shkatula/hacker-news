import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import classNames from 'classnames'
import { createMuiTheme, withWidth } from '@material-ui/core'
import URLDataRenderer from './URLDataRenderer'
import { colors, unit } from '../styles'
import Header from './Header'
import { modes } from './Item'

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    overflow: 'hidden',
  },
  pageHeigh:{
    height: '100vh',
  },
  content: {
    height: '100%',
    overflow: 'scroll',
    width: '70%',
    padding: unit * 2,
    paddingRight: unit * 4,
    boxSizing: 'border-box',
  },
  header: {
    width: '30%',
    color: colors.grey,
    padding: unit * 2,
    boxSizing: 'border-box',
  },
  font32: {
    fontSize: 32,
  },
  font42: {
    fontSize: 42,
  },
  font50: {
    fontSize: 58,
  },
  fullWidth: {
    width: '100%',
  }
})

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Helvetica", "Arial", sans-serif',
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  },
})

function MasterPage ({width, routeProps}) {
  const classes = useStyles()
  const {match: {params = {}} = {}} = routeProps
  let url = params[0]
  const showTopStories = (url || '') === ''
  showTopStories && (url = 'topstories')

  const isExtraSmall = width === 'xs'
  const isSmall = width === 'sm'
  const isMedium = width === 'md'

  return (
    <div
      className={classNames([classes.root, !isExtraSmall && classes.pageHeigh])}
      style={(isSmall || isExtraSmall) ? {flexDirection: 'column'} : undefined}
    >
      <ThemeProvider theme={theme}>
        <Header
          className={classNames([
            classes.header,
            (isSmall || isExtraSmall) && classes.fullWidth,
          ])}
          textClassName={classNames([
            isMedium && classes.font50,
            isSmall && classes.font42,
            isExtraSmall && classes.font32,
          ])}
        />
        <div
          className={classNames([
            classes.content,
            (isSmall || isExtraSmall) && classes.fullWidth,
          ])}
        >
          {showTopStories ? (
            <URLDataRenderer
              url={url}
              title={'Top Stories'}
              asLinks
              mode={modes.MINIMIZED}
            />
          ) : (
            <URLDataRenderer
              url={url}
              mode={modes.FULL}
            />
          )}
        </div>
      </ThemeProvider>
    </div>
  )
}

export default withWidth()(MasterPage)
