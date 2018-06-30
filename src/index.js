/**
 * Copyright Yafei Hu
 */

import React, { Fragment } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import NavBar from './NavBar'
import Requests from './Requests'

const ProgrammerTest = () => (
  <BrowserRouter>
    <Fragment>
      <NavBar />
      <Route
        path="/requests"
        component={Requests}
        exact
      />
    </Fragment>
  </BrowserRouter>
)

render(<ProgrammerTest />, document.getElementById('root'))
