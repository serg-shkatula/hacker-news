import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Item from './Item'
import { fetchData } from '../api'
import { unit } from '../styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  content: {
    paddingLeft: unit
  },
})

function URLDataRenderer ({url, title, quickView, asLink}) {
  const classes = useStyles()
  const [data, setData] = useState(undefined)
  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData(url, 20)
      setData(fetchedData)
    })()
  }, [url])

  const ContentWrapper = asLink ? (({children}) => <Link to={'/' + url}>{children}</Link>) : 'div'

  return (
    <div>
      <Typography variant={'h2'}>{title}</Typography>
      <ContentWrapper className={classes.content}>
        {!data ? (
          <Typography>Fetching...</Typography>
        ) : (
          Array.isArray(data) ? (
            data.map((item) => (
              <URLDataRenderer key={item} url={'item/' + item} asLink={quickView}/>
            ))
          ) : (
            <Item data={data}/>
          )
        )}
      </ContentWrapper>
    </div>
  )
}

export default URLDataRenderer
