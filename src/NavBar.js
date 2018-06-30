/**
 * Copyright Yafei Hu
 */

import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavBar.css'

const NavBar = () => (
  <div className="NavBar__container">
    <NavLink
      activeClassName="NavBar__active-item"
      to="/requests"
      exact
    >
      Code
    </NavLink>
  </div>
)

export default NavBar
