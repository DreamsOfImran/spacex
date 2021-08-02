import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Dropdown, Table } from 'react-bootstrap'
import Pagination from 'react-bootstrap-4-pagination'
import LaunchDetails from './LaunchDetails'
import StatusBadge from './StatusBadge'
import Loader from './Loader'

const LaunchList = () => {
  const [loading, setLoading] = useState(true)
  const [launches, setLaunches] = useState([])
  const [launchType, setLaunchType] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState(1)

  const [launchInfo, setLaunchInfo] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchLaunches()
    // eslint-disable-next-line
  }, [pageNumber])

  useEffect(() => {
    setPageNumber(1)
    setTotalPageCount(1)
    fetchLaunches()
    // eslint-disable-next-line
  }, [launchType])

  const fetchLaunches = () => {
    setLoading(true)
    axios.get(`https://api.spacexdata.com/v3/launches/${launchType}?limit=12&offset=${(pageNumber - 1)*12}`).then(resp => {
      setLaunches(resp.data)
      setTotalPageCount(Math.ceil(parseInt(resp.headers['spacex-api-count'])/12))
      setLoading(false)
    }).catch(err => {
      setLaunches([])
      setLoading(false)
    })
  }

  const fetchLaunchDetails = (flight_number) => {
    axios.get(`https://api.spacexdata.com/v3/launches/${flight_number}`).then(resp => {
      setLaunchInfo(resp.data)
      handleShow()
    })
  }
  const currentLaunchType = () => {
    switch (launchType) {
      case 'latest':
        return 'Latest Launches'
      case 'upcoming':
        return 'Upcoming Launches'
      case 'past':
        return 'Past Launches'
      default:
        return 'All Launches'
    }
  }

  return (
    <Container className="h-90 d-flex align-items-center d-lg-grid list-container">
      <Dropdown className="text-end mt-4 filter-dropdown">
        <Dropdown.Toggle variant="transparent" id="dropdown-basic">
          <i className="bi bi-funnel" /> {currentLaunchType()}&nbsp;&nbsp;
        </Dropdown.Toggle>

        <Dropdown.Menu className="py-0">
          <Dropdown.Item onClick={() => setLaunchType('')} className={launchType === '' ? "filter-active" : null}>All Launches</Dropdown.Item>
          <Dropdown.Item onClick={() => setLaunchType('latest')} className={launchType === 'latest' ? "filter-active" : null}>Latest Launches</Dropdown.Item>
          <Dropdown.Item onClick={() => setLaunchType('upcoming')} className={launchType === 'upcoming' ? "filter-active" : null}>Upcoming Launches</Dropdown.Item>
          <Dropdown.Item onClick={() => setLaunchType('past')} className={launchType === 'past' ? "filter-active" : null}>Past Launches</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table className="shadow-sm mb-0" size="lg" hover borderless>
        <thead className="table-header-bg">
          <tr>
            <td align="center">No:</td>
            <td align="center">Launched (UTC)</td>
            <td>Location</td>
            <td>Mission</td>
            <td>Orbit</td>
            <td align="center">Launch Status</td>
            <td>Rocket</td>
          </tr>
        </thead>
        <tbody>
          {loading ?
            <Loader /> 
            :
            launches.length !== 0 ? 
            launches.map(launch => (
            <tr key={launch.launch_date_unix} className="td-padding-y pointer-cursor" onClick={() => fetchLaunchDetails(launch.flight_number)}>
              <td align="center">{launch.flight_number}</td>
              <td align="center">{launch.launch_date_utc}</td>
              <td>{launch.launch_site.site_name}</td>
              <td>{launch.mission_name}</td>
              <td>{launch.rocket.second_stage.payloads[0].orbit}</td>
              <td align="center">
                <StatusBadge upcoming={launch.upcoming} launch_success={launch.launch_success} />
              </td>
              <td>{launch.rocket.rocket_name}</td>
            </tr>
          ))
          :
          <tr>
            <td colSpan={7} className="text-center">No results found for the specified filter</td>
          </tr>
        }
        </tbody>
      </Table>

      <div className="ml-auto h-100">
        <Pagination
          totalPages={totalPageCount}
          currentPage={pageNumber}
          showMax={2}
          activeBgColor="#F4F5F7"
          activeColor="#1F2937"
          activeBorderColor="#E4E4E7"
          onClick={(pn) => setPageNumber(pn)}
          prevNext
          threeDots
        />
      </div>

      {launchInfo && (
        <LaunchDetails
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          launchInfo={launchInfo}
        />
      )}
    </Container>
  )
}

export default LaunchList
