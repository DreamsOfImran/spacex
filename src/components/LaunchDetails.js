import React from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import StatusBadge from './StatusBadge'

const LaunchDetails = ({ show, handleClose, launchInfo }) => {

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="m-3">
        <div className="row">
          <div className="col-auto">
            <img src={launchInfo.links.mission_patch_small} height="75" width="75" alt={launchInfo.mission_name} />
          </div>
          <div className="col-auto">
            <h5>{launchInfo.mission_name}</h5>
            <span>{launchInfo.rocket.rocket_name}</span>
            <div className="mt-2">
              <a href={launchInfo.links.article_link} className="text-dark" target="_blank" rel="noreferrer"><i className="bi bi-globe mr-1" /></a>
              <a href={launchInfo.links.wikipedia} className="text-dark" target="_blank" rel="noreferrer"><i className="fa fa-wikipedia-w mx-1" /></a>
              <a href={launchInfo.links.video_link} className="text-dark" target="_blank" rel="noreferrer"><i className="bi bi-youtube mx-1" /></a>
            </div>
          </div>
          <div className="col-auto">
            <StatusBadge upcoming={launchInfo.upcoming} launch_success={launchInfo.launch_success} />
          </div>
          <div className="text-end position-absolute">
            <Button variant="transparent" onClick={handleClose}>
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>
        </div>
        <div className="mt-3">
          {launchInfo.details}
          &nbsp;
          <a href={launchInfo.links.wikipedia} className="text-decoration-none" target="_blank" rel="noreferrer">Wikipedia</a>
        </div>
        <ListGroup variant="flush" className="mt-3">
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Flight Number</div>
              <div className="col">{launchInfo.flight_number}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Mission Name</div>
              <div className="col">{launchInfo.mission_name}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Rocket Type</div>
              <div className="col">{launchInfo.rocket.rocket_type}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Rocket Name</div>
              <div className="col">{launchInfo.rocket.rocket_name}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Manufacturer</div>
              <div className="col">{launchInfo.rocket.second_stage.payloads[0].manufacturer}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Nationality</div>
              <div className="col">{launchInfo.rocket.second_stage.payloads[0].nationality}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Launch Date</div>
              <div className="col">{launchInfo.launch_date_local}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Payload Type</div>
              <div className="col">{launchInfo.rocket.second_stage.payloads[0].payload_type}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Orbit</div>
              <div className="col">{launchInfo.rocket.second_stage.payloads[0].orbit}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="row">
              <div className="col">Launch Site</div>
              <div className="col">{launchInfo.launch_site.site_name}</div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default LaunchDetails
