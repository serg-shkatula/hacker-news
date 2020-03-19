import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, withWidth } from '@material-ui/core'
import Item, { modes } from './Item'
import { fetchData } from '../api'
import { colors, unit } from '../styles'
import UnstyledLink from './UnstyledLink'

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
  content: {
    paddingLeft: unit * 3,
    // paddingBottom: unit * 2,
  },
  'content-sm': {
    paddingLeft: unit * 2,
  },
  'content-xs': {
    paddingLeft: unit,
  },
  item: {
    marginBottom: unit,
  },
  title: {
    marginBottom: unit,
  },
  link: {
    display: 'block',
    '&:hover': {
      // opacity: 0.5,
      color: colors.highlight,
    }
  },
  paddingRight1unit: {
    paddingRight: unit
  },
  leftLine: {
    borderLeft: `1px solid ${colors.lighterGrey}`
  }
})

let lastKnownWidth

function URLDataRenderer ({width, url, title, data: propsData, mode = 'full', asLinks}) {
  const classes = useStyles()
  const [data, setData] = useState(undefined)

  width = width || lastKnownWidth
  lastKnownWidth = width
  console.log('URLDataRenderer.URLDataRenderer, ~ Line 48: width >', width)

  useEffect(() => {
    setData(undefined)
    if (!url) return
    let isUnmounted
    (async () => {
      const fetchedData = await fetchData(url, 20)
      !isUnmounted && setData(fetchedData)
    })()
    return () => (isUnmounted = true)
  }, [url])

  useEffect(() => {
    setData(propsData)
  }, [propsData])

  const ContentWrapper = asLinks
    ? (({children}) => <UnstyledLink className={classes.link} to={'/' + url}>{children}</UnstyledLink>)
    : 'div'

  return (
    <div className={classes.root}>
      {title && <Typography variant={'h4'} className={classes.title}>{title}</Typography>}
      {!data ? (
        <Typography>Fetching...</Typography>
      ) : (
        Array.isArray(data) ? (
          data.map((item) => (
            <URLDataRenderer mode={mode} key={item} url={'item/' + item} asLinks={asLinks}/>
          ))
        ) : (
          <ContentWrapper
            className={
                classes['content-' + width] || classes.content
            }
          >
            <Item className={classes.item} mode={mode} data={data}/>
          </ContentWrapper>
        )
      )}
    </div>
  )
}

export default withWidth()(URLDataRenderer)
