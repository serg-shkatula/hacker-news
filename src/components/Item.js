import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import URLDataRenderer from './URLDataRenderer'
import { colors, unit } from '../styles'
import UnstyledLink from './UnstyledLink'

const useStyles = makeStyles({
  root: {},
  time: {
    color: colors.grey
  },
})

const keys = {
  ID: 'id',
  TIME: 'time',
  TITLE: 'title',
  BY: 'by',
  SCORE: 'score',
  TEXT: 'text',
  KARMA: 'karma',
  CREATED: 'created',
  KIDS: 'kids',
  SUBMITTED: 'submitted',
  URL: 'url',
  TIME_BY_SCORE: 'time_by_score'
}

const modesMap = {
  FULL: 'full',
  MINIMIZED: 'minimized',
  COMMENT: 'comment',
  SUBMIT_PREVIEW: 'submit-preview',
  DEFAULT: 'default',
}

const COMPONENTS = [
  {
    key: keys.TIME_BY_SCORE,
    componentMap: {
      [modesMap.DEFAULT]: ({value: {time, by, score}, classes, ...props}) => {
        let text = `${moment.unix(time).fromNow()}`
        return (
          <Typography {...props} variant={'caption'} className={classes.time}>
            {text} ∙ {by}{score ? ` ∙ ${score} points` : ''}
          </Typography>
        )
      },
      [modesMap.SUBMIT_PREVIEW]: ({value: {time, by, score}, classes, ...props}) => {
        let text = `${moment.unix(time).fromNow()}`
        return (
          <Typography {...props} variant={'caption'} className={classes.time}>
            {text}
          </Typography>
        )
      },
      [modesMap.COMMENT]: ({value: {time, by, score}, classes, ...props}) => {
        let text = `${moment.unix(time).fromNow()}`
        return (
          <Typography {...props} variant={'caption'} className={classes.time}>
            {text} ∙ <UnstyledLink href={`/user/${by}`}>{by}</UnstyledLink>{score ? ` ∙ ${score} points` : ''}
          </Typography>
        )
      },
      [modesMap.FULL]: ({value: {time, by, score}, classes, ...props}) => {
        let text = `${moment.unix(time).fromNow()}`
        return (
          <Typography {...props} variant={'caption'} className={classes.time}>
            {text} ∙ <UnstyledLink href={`/user/${by}`}>{by}</UnstyledLink>{score ? ` ∙ ${score} points` : ''}
          </Typography>
        )
      }
    }
  },
  {
    key: keys.TITLE,
    componentMap: {
      [modesMap.DEFAULT]: ({value, classes, ...props}) => (
        <Typography {...props} variant="h2" style={{overflowWrap: 'break-word'}}>
          {value}
        </Typography>
      ),
      [modesMap.MINIMIZED]: ({value, classes, ...props}) => (
        <Typography {...props} variant="h5" style={{overflowWrap: 'break-word'}}>
          {value}
        </Typography>
      ),
      [modesMap.SUBMIT_PREVIEW]: ({value, classes, ...props}) => (
        <Typography {...props} variant="h5" style={{overflowWrap: 'break-word'}}>
          {value}
        </Typography>
      )
    }
  },
  {
    key: keys.URL,
    componentMap: {
      [modesMap.FULL]: ({value, classes, ...props}) => (
        <Typography {...props} style={{...props.style, marginTop: unit, marginBottom: unit}}>
          <UnstyledLink component={'a'} href={value} target={'blank'}>source →</UnstyledLink>
        </Typography>
      )
    },
  },
  {
    key: keys.TEXT,
    componentMap: {
      [modesMap.FULL]: ({value, classes, ...props}) => (
        <Typography {...props}>
          {/*assuming that the source is trusted and using dangerouslySetInnerHTML*/}
          <span dangerouslySetInnerHTML={{__html: value}}/>
        </Typography>
      ),
      [modesMap.COMMENT]: ({value, classes, ...props}) => (
        <Typography {...props} style={{overflowWrap: 'break-word', overflow: 'scroll'}}>
          {/*assuming that the source is trusted and using dangerouslySetInnerHTML*/}
          <span dangerouslySetInnerHTML={{__html: value}}/>
        </Typography>
      ),
      [modesMap.SUBMIT_PREVIEW]: ({value, classes, ...props}) => (
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
          <span dangerouslySetInnerHTML={{__html: value}}/>
        </Typography>
      )
    }
  },
  {
    key: keys.CREATED,
    componentMap: {
      [modesMap.FULL]: ({value, classes, ...props}) => (
        <Typography {...props}>
          Created: {moment.unix(value).calendar()}
        </Typography>
      ),
    }
  },
  {
    key: keys.KARMA,
    componentMap: {
      [modesMap.FULL]: ({value, classes, ...props}) => (
        <Typography {...props}>
          Karma: {value}
        </Typography>
      ),
    }
  },
  {
    key: keys.KIDS,
    componentMap: {
      [modesMap.FULL]: ({value, classes, ...props}) => (
        <URLDataRenderer {...props} data={value} title={'Comments'} mode={modes.COMMENT}/>
      ),
      [modesMap.COMMENT]: ({value, classes, ...props}) => (
        <URLDataRenderer {...props} data={value} mode={modes.COMMENT}/>
      )
    },
  },
  {
    key: keys.SUBMITTED,
    componentMap: {
      [modesMap.FULL]: ({value, classes, ...props}) => (
        <URLDataRenderer
          {...props}
          data={(value || []).slice(0,20)}
          title={'Submitted'}
          mode={modes.SUBMIT_PREVIEW}
          asLinks
        />
      ),
    },
  },
]

export const modes = modesMap

export default function Item ({className, data, mode}) {
  const classes = useStyles()

  const parsedData = {...(data || {})}
  const {[keys.TIME]: time, [keys.BY]: by, [keys.TITLE]: title, [keys.TEXT]: text} = parsedData

  data && time && by && (
    parsedData[keys.TIME_BY_SCORE] = {
      time: parsedData[keys.TIME],
      by: parsedData[keys.BY],
      score: parsedData[keys.SCORE]
    }
  )

  if (!title && !text) parsedData[keys.TITLE] = parsedData[keys.ID]

  return (
    <div>
      {COMPONENTS.map(({key, componentMap = {}}) => {
        const Component = componentMap[mode] || componentMap.default
        if (!parsedData[key] || !Component) return undefined
        return (
          <Component className={className} key={key} value={parsedData[key]} classes={classes}/>
        )
      })}
    </div>
  )
}
