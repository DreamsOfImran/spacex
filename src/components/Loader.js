import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <tr>
      <td>
        <Spinner animation="border" role="status" className="d-block position-fixed top-50 right-50">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </td>
    </tr>
  )
}

export default Loader
