import { getAllNotifications } from '@/helpers/data';
import { timeSince } from '@/utils/date';
import clsx from 'clsx';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { BsBell, BsBellSlash, BsCheckLg, BsThreeDots, BsTrash, BsVolumeMute } from 'react-icons/bs';
import LoadMoreButton from './components/LoadMoreButton';
import { useFetchData } from '@/hooks/useFetchData';
import PageMetaData from '@/components/PageMetaData';
const Notifications = () => {
  const allNotifications = useFetchData(getAllNotifications);
  return <>
    <PageMetaData title='Notifications' />
    <main>
      <Container>
        <Row className="g-4">
          <Col lg={8} className="mx-auto">
            <Card>
              <CardHeader className="py-3 border-0 d-flex align-items-center justify-content-between">
                <h1 className="h5 mb-0">Notifications</h1>
                <Dropdown>
                  <DropdownToggle as="a" className="text-secondary content-none btn btn-secondary-soft-hover py-1 px-2" id="cardNotiAction" data-bs-toggle="dropdown" aria-expanded="false">
                    <BsThreeDots />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardNotiAction">
                    <li>
                      <DropdownItem>
                        
                        <BsCheckLg size={22} className="fa-fw pe-2" />
                        Mark all read
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsBellSlash size={22} className="fa-fw pe-2" />
                        Push notifications
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsBell size={22} className="fa-fw pe-2" />
                        Email notifications
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <CardBody className="p-2">
                <ul className="list-unstyled">
                  {allNotifications?.map((notification, idx) => <li key={idx}>
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
                        <div className="d-flex ms-auto">
                          <p className="small me-5 text-nowrap">{timeSince(notification.time)}</p>
                          <Dropdown className="position-absolute end-0 top-0 mt-3 me-3">
                            <DropdownToggle as="a" className="z-index-1 text-secondary btn position-relative content-none py-0 px-2" id="cardNotiAction1" data-bs-toggle="dropdown" aria-expanded="false">
                              <BsThreeDots />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardNotiAction1">
                              <li>
                                <DropdownItem>
                                  
                                  <BsTrash size={22} className="fa-fw pe-2" />
                                  Delete
                                </DropdownItem>
                              </li>
                              <li>
                                <DropdownItem>
                                  
                                  <BsBellSlash size={22} className="fa-fw pe-2" />
                                  Turn off
                                </DropdownItem>
                              </li>
                              <li>
                                <DropdownItem>
                                  
                                  <BsVolumeMute size={22} className="fa-fw fs-5 pe-2" />
                                  Mute Judy Nguyen
                                </DropdownItem>
                              </li>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    </li>)}
                </ul>
              </CardBody>
              <CardFooter className="border-0 py-3 text-center position-relative d-grid pt-0">
                <LoadMoreButton />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
    </>;
};
export default Notifications;