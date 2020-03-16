import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {
    textDecoration: 'none',
    color: 'inherit',
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
