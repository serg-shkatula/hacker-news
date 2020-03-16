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

const KEYS = {
  time: 'time',
  title: 'title',
  by: 'by',
  score: 'score',
  text: 'text',
  kids: 'kids',
}

const COMPONENTS = [
  // {
  //   key: 'time',
  //   showWhenMinimized: true,
  //   Component: ({value, ...props}) => (
  //     <Typography {...props} variant={'caption'}>{moment.unix(value).calendar()}</Typography>
  //   )
  // },
  {
    key: 'time_by_score',
    showWhenMinimized: true,
    Component: ({value: {time, by, score}, classes, ...props}) => {
      let text = `${moment.unix(time).fromNow()} - ${by}`
      if (score) text += `- ${score} points`
      return (
        <Typography {...props} variant={'caption'} className={classes.time}>
          {text}
        </Typography>
      )
    }
  },
  {
    key: 'title',
    showWhenMinimized: true,
    Component: ({value, classes, ...props}) => (
      <Typography {...props} variant="h2">{value}</Typography>
    ),
    MinimizedComponent: ({value, classes, ...props}) => (
      <Typography {...props} variant="h5">{value}</Typography>
    )
  },
  {
    key: 'url',
    Component: ({value, classes, ...props}) => (
      <Typography {...props} variant="h2">{value}</Typography>
    ),
  },
  // {
  //   key: 'by',
  //   Component: ({value, ...props}) => (
  //     <Typography {...props}>By: {value}</Typography>
  //   )
  // },
  // {
  //   key: 'score',
  //   Component: ({value, ...props}) => (
  //     <Typography {...props}>Score: {value}</Typography>
  //   )
  // },
  {
    key: 'text',
    showWhenMinimized: true,
    Component: ({value, classes, ...props}) => (
      <Typography {...props}>Text: {value}</Typography>
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
        {value}
      </Typography>
    )
  },
  {
    key: 'kids',
    Component: ({value, classes, ...props}) => (
      <URLDataRenderer {...props} data={value} title={'Comments'} quickView/>
    )
  },
]

export default function Item ({className, data, minimized}) {
  const classes = useStyles()

  const parsedData = {...(data || {})}
  data && (
    parsedData.time_by_score = {
      time: parsedData[KEYS.time],
      by: parsedData[KEYS.by],
      score: parsedData[KEYS.score]
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
