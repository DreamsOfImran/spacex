import React from 'react'
import { Badge } from 'react-bootstrap'

const StatusBadge = ({ upcoming, launch_success }) => {
  return (
    <Badge className={`${upcoming ? 'badge-bg-upcoming' : launch_success ? 'badge-bg-success' : 'badge-bg-failed'} px-3`} pill>
      {upcoming ? 'Upcoming' : launch_success ? 'Success' : 'Failed'}
    </Badge>
  )
}

export default StatusBadge
