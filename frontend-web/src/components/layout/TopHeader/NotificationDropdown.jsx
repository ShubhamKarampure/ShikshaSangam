import { getAllNotifications } from '@/helpers/data';
import { timeSince } from '@/utils/date';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { BsBellFill } from 'react-icons/bs';
import { useFetchData } from '@/hooks/useFetchData';
const NotificationDropdown = () => {
  const allNotifications = useFetchData(getAllNotifications);
  return <Dropdown as="li" autoClose="outside" className="nav-item ms-2" drop="down" align="end">
      <DropdownToggle className="content-none nav-link bg-light icon-md btn btn-light p-0">
        <span className="badge-notif animation-blink" />
        <BsBellFill size={15} />
      </DropdownToggle>
      <DropdownMenu className="dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h6 className="m-0">
              Notifications <span className="badge bg-danger bg-opacity-10 text-danger ms-2">4 new</span>
            </h6>
            <Link className="small" to="">
              Clear all
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="list-group list-group-flush list-unstyled p-2">
              {allNotifications?.slice(0, 4).map((notification, idx) => <li key={idx}>
                  <div className={clsx('rounded d-sm-flex border-0 mb-1 p-3 position-relative', {
                'badge-unread': !notification.isRead
              })}>
                    <div className="avatar text-center">
                      {notification.avatar ? <img className="avatar-img rounded-circle" src={notification.avatar} alt="" /> : <div className={`avatar-img rounded-circle bg-${notification.textAvatar?.variant}`}>
                          <span className="text-white position-absolute top-50 start-50 translate-middle fw-bold">
                            {notification.textAvatar?.text}
                          </span>
                        </div>}
                    </div>
                    <div className="mx-sm-3 my-2 my-sm-0">
                      <p className={clsx('small', notification.description ? 'mb-0' : 'mb-2')}>{notification.title}</p>
                      {notification.description && notification.description}
                      {notification.isFriendRequest && <div className="d-flex">
                          <Button variant="primary" size="sm" className="py-1 me-2">
                            Accept
                          </Button>
                          <Button variant="danger-soft" size="sm" className="py-1">
                            Delete
                          </Button>
                        </div>}
                    </div>
                    <p className="small text-nowrap">{timeSince(notification.time).slice(0, 5)}</p>
                  </div>
                </li>)}
            </ul>
          </CardBody>
          <CardFooter className="text-center">
            <Button variant="primary-soft" size="sm">
              See all incoming activity
            </Button>
          </CardFooter>
        </Card>
      </DropdownMenu>
    </Dropdown>;
};
export default NotificationDropdown;