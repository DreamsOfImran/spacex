import React from 'react'
import { Nav } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Nav className="justify-content-center shadow-sm">
      <Nav.Item>
        <img
          src="/spacex/spacex.png"
          width="250"
          className="d-inline-block align-top m-3"
          alt="React Bootstrap logo"
        />
      </Nav.Item>
    </Nav>
  )
}

export default NavBar
