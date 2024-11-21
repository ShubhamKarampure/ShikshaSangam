import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardHeader, CardTitle, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import PageMetaData from '@/components/PageMetaData';
import eventImg from '@/assets/images/events/01.jpg';
import { BsBookmark, BsCalendarCheck, BsFileEarmarkPdf, BsGear, BsGeoAlt, BsLock, BsPeople, BsThreeDots } from 'react-icons/bs';
const Events = () => {
  return <>
    <PageMetaData title='Events' />
    <Card>
      <CardHeader className="d-sm-flex align-items-center justify-content-between border-0 pb-0">
        <CardTitle className="mb-sm-0">Discover Events</CardTitle>
        <Button variant="primary-soft" size="sm">
          
          <span className="icons-center">
            <FaPlus className="pe-1" /> Create events
          </span>
        </Button>
      </CardHeader>
      <CardBody>
        <Alert variant="success" dismissible className="fade show" role="alert">
          <strong>Upcoming event:</strong> The learning conference on Sep 19 2024
          <Link to="/events" className="btn btn-xs btn-success ms-md-4">
            View event
          </Link>
        </Alert>
        <div className="row">
          <div className="d-sm-flex align-items-center">
            <div className="avatar avatar-xl">
              <span role="button">
                <img className="avatar-img rounded border border-white border-3" src={eventImg} alt="event" />
              </span>
            </div>
            <div className="ms-sm-4 mt-2 mt-sm-0">
              <h5 className="mb-1">
                <Link to="/event/details"> Comedy on the green </Link>
              </h5>
              <ul className="nav nav-stack small">
                <li className="nav-item icons-center gap-1">
                  <BsCalendarCheck size={18} className="pe-1" /> Mon, Sep 25, 2020 at 9:30 AM
                </li>
                <li className="nav-item icons-center gap-1">
                  <BsGeoAlt size={18} className="pe-1" /> San francisco
                </li>
                <li className="nav-item icons-center gap-1">
                  <BsPeople size={18} className="pe-1" /> 77 going
                </li>
              </ul>
            </div>
            <div className="d-flex mt-3 ms-auto">
              <Dropdown>
                <DropdownToggle as="a" className="icon-md btn btn-secondary-soft content-none" type="button" id="profileAction" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>
                    <BsThreeDots />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end" aria-labelledby="profileAction">
                  <li>
                    <DropdownItem>
                      
                      <BsBookmark className="fa-fw pe-2" />
                      Share profile in a message
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsFileEarmarkPdf className="fa-fw pe-2" />
                      Save your profile to PDF
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsLock className="fa-fw pe-2" />
                      Lock profile
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownDivider />
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsGear className="fa-fw pe-2" />
                      Profile settings
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
    </>;
};
export default Events;