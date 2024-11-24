import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl } from 'react-bootstrap';
import { BsBell, BsBellSlash, BsThreeDots, BsTrash } from 'react-icons/bs';
const CelebrationCard = ({
  celebration
}) => {
  const {
    title,
    user,
    isEvent,
    placeholder,
    textAvatar
  } = celebration;
  return <div className="d-flex mb-3">
      <div className={clsx(`avatar avatar-lg status-${user?.status} me-2`, {
      'avatar-story': user?.isStory
    })}>
        {textAvatar ? <div className="avatar-img rounded-circle bg-danger bg-opacity-10 text-danger">
            <span className="position-absolute top-50 start-50 translate-middle fw-bold">BV</span>
          </div> : <>
            {user?.avatar && <span role="button">
                <img className="avatar-img rounded-circle" src={user.avatar} alt="image" />
              </span>}
          </>}
      </div>
      <div className="ms-2 w-100">
        <div className="d-sm-flex justify-content-between">
          {title}
          <Dropdown drop="start" className="ms-auto">
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
        {isEvent ? <Link to="/events/details" className="btn btn-sm btn-primary-soft">
            View event
          </Link> : <div className="position-relative w-100">
            <FormControl as="textarea" className="form-control pe-4" rows={1} placeholder={placeholder} defaultValue={''} />
          </div>}
      </div>
    </div>;
};
export default CelebrationCard;