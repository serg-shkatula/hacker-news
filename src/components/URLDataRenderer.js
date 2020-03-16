import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Item from './Item'
import { fetchData } from '../api'
import { unit } from '../styles'
import UnstyledLink from './UnstyledLink'

const useStyles = makeStyles({
  content: {
    paddingRight: unit,
    paddingLeft: unit,
    paddingBottom: unit * 2,
  },
  item: {
    marginBottom: unit,
  },
  title: {
    marginBottom: unit,
  }
})

function URLDataRenderer ({url, title, data: propsData, quickView, asLink}) {
  const classes = useStyles()
  const [data, setData] = useState(undefined)
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

  const ContentWrapper = asLink ? (({children}) => <UnstyledLink to={'/' + url}>{children}</UnstyledLink>) : 'div'

  return (
    <div>
      <Typography variant={'h2'} className={classes.title}>{title}</Typography>
      <ContentWrapper className={classes.content}>
        {!data ? (
          <Typography>Fetching...</Typography>
        ) : (
          Array.isArray(data) ? (
            data.map((item) => (
              <URLDataRenderer key={item} url={'item/' + item} asLink={quickView}/>
            ))
          ) : (
            <Item className={classes.item} minimized={asLink} data={data}/>
          )
        )}
      </ContentWrapper>
    </div>
  )
}

export default URLDataRenderer
