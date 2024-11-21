import { getAllCelebrations } from '@/helpers/data';
import { Card, CardBody, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import CelebrationCard from './CelebrationCard';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BsBell, BsBellSlash, BsGeoAltFill, BsThreeDots, BsTrash } from 'react-icons/bs';
import { useFetchData } from '@/hooks/useFetchData';
const UpcomingCelebrations = () => {
  const allCelebrations = useFetchData(getAllCelebrations);
  return <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle as="h5">Upcoming Celebration</CardTitle>
      </CardHeader>
      <CardBody>
        {allCelebrations?.slice(5, 8).map((celebration, idx) => <Fragment key={idx}>
            <CelebrationCard celebration={celebration} />
            <hr className="my-4" />
          </Fragment>)}

        <div className="d-flex mb-3">
          <div className="avatar avatar-lg me-2">
            <div className="avatar-img rounded-circle bg-success bg-opacity-10 text-success">
              <span className="position-absolute top-50 start-50 translate-middle fw-bold text-center lh-1">
                22 <br /> Feb
              </span>
            </div>
          </div>
          <div className="ms-2 w-100">
            <div className="d-sm-flex justify-content-between">
              <div>
                <Link className="h6" to="">
                  International Conference on Cyber Law, Cybercrime &amp; Cyber Security
                </Link>
                <p className="d-block small">
                  
                  <BsGeoAltFill /> 19 School Lane, London, United Kingdom
                </p>
              </div>
              <Dropdown className="ms-auto">
                <DropdownToggle as="a" className="text-secondary content-none cursor-pointer" id="bdayActionEdit" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsThreeDots />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end" aria-labelledby="bdayActionEdit">
                  <li>
                    <DropdownItem>
                      
                      <BsTrash size={19} className="fa-fw pe-1" /> Delete
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsBell size={19} className="fa-fw pe-1" /> Turn off notification
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsBellSlash size={19} className="fa-fw pe-1" /> Mute Amanda Read
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Link to="/events/details" className="btn btn-sm btn-primary-soft">
              Join now
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>;
};
export default UpcomingCelebrations;