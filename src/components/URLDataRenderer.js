import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Item from './Item'
import { fetchData } from '../api'

const useStyles = makeStyles({
  root: {},
})

function URLDataRenderer ({url, title}) {
  const classes = useStyles()
  const [data, setData] = useState(undefined)
  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData(url, 20)
      setData(fetchedData)
    })()
  }, [url])
  return (
    <div>
      <Typography variant={'h2'}>{title}</Typography>
      {!data ? (
        <Typography>Fetching...</Typography>
      ) : (
        Array.isArray(data) ? (
          data.map((item) => (
            <URLDataRenderer key={item} url={'item/' + item}/>
          ))
        ) : (
          <Item data={data}/>
        )
      )}
    </div>
  )
}

export default URLDataRenderer
