import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { colors } from '../styles'

const styles = {
  root: {
    textDecoration: 'none',
    '&:hover': {color: colors.highlight},
  }
}

export default withStyles(styles)(
  ({className, classes, component: Component = Link, ...props}) => (
    <Component
      {...props}
      className={classNames([className, classes.root])}
      to={props.href || props.to}
    >
      {props.children}
    </Component>
  )
)
