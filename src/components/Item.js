import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import URLDataRenderer from './URLDataRenderer'
import { colors } from '../styles'

const useStyles = makeStyles({
  root: {},
  time: {
    color: colors.grey
  },
})

const keys = {
  TIME: 'time',
  TITLE: 'title',
  BY: 'by',
  SCORE: 'score',
  TEXT: 'text',
  KIDS: 'kids',
  URL: 'url',
  TIME_BY_SCORE: 'time_by_score'
}

const COMPONENTS = [
  {
    key: keys.TIME_BY_SCORE,
    showWhenMinimized: true,
    Component: ({value: {time, by, score}, classes, ...props}) => {
      let text = `${moment.unix(time).fromNow()} ∙ ${by}`
      if (score) text += ` ∙ ${score} points`
      return (
        <Typography {...props} variant={'caption'} className={classes.time}>
          {text}
        </Typography>
      )
    }
  },
  {
    key: keys.TITLE,
    showWhenMinimized: true,
    Component: ({value, classes, ...props}) => (
      <Typography {...props} variant="h2">{value}</Typography>
    ),
    MinimizedComponent: ({value, classes, ...props}) => (
      <Typography {...props} variant="h5">{value}</Typography>
    )
  },
  {
    key: keys.URL,
    Component: ({value, classes, ...props}) => (
      <Typography {...props} variant="h2">{value}</Typography>
    ),
  },
  {
    key: keys.TEXT,
    showWhenMinimized: true,
    Component: ({value, classes, ...props}) => (
      <Typography {...props}>
        {/*assuming that the source is trusted and using dangerouslySetInnerHTML*/}
        <span dangerouslySetInnerHTML={{__html:value}} />
      </Typography>
    ),
    MinimizedComponent: ({value, classes, ...props}) => (
      <Typography
        {...props}
        style={{
          overflowWrap: 'break-word',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxHeight: 20,
          maxLines: 1,
          textOverflow: 'ellipsis'
        }}
      >
        {/*assuming that the source is trusted and using dangerouslySetInnerHTML*/}
        <span dangerouslySetInnerHTML={{__html:value}} />
      </Typography>
    )
  },
  {
    key: keys.KIDS,
    Component: ({value, classes, ...props}) => (
      <URLDataRenderer {...props} data={value} title={'Comments'} quickView/>
    )
  },
]

export default function Item ({className, data, minimized}) {
  const classes = useStyles()

  const parsedData = {...(data || {})}
  data && (
    parsedData[keys.TIME_BY_SCORE] = {
      time: parsedData[keys.TIME],
      by: parsedData[keys.BY],
      score: parsedData[keys.SCORE]
    }
  )

  return (
    <div className={className}>
      {COMPONENTS.map(({key, Component, MinimizedComponent, showWhenMinimized}) => {
        if (minimized && !showWhenMinimized) return undefined
        Component = (minimized && MinimizedComponent) || Component
        return parsedData[key] && (
          <Component key={key} value={parsedData[key]} classes={classes}/>
        )
      })}
    </div>
  )
}
