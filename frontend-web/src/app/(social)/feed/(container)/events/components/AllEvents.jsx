import useToggle from '@/hooks/useToggle';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BsCalendar2Event, BsFileEarmarkText } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import * as yup from 'yup';
import EventCard from '@/components/cards/EventCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import DateFormInput from '@/components/form/DateFormInput';
import DropzoneFormInput from '@/components/form/DropzoneFormInput';
import { eventData } from '@/assets/data/social';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar5 from '@/assets/images/avatar/05.jpg';
import avatar6 from '@/assets/images/avatar/06.jpg';
import avatar7 from '@/assets/images/avatar/07.jpg';
const AllEvents = () => {
  const eventCategories = ['all', 'local', 'this-week', 'online', 'friends', 'following'];
  // const allEvents = useFetchData(getAllEvents)
  const allEvents = eventData;
  const [events, setEvents] = useState(eventData);
  const filterEvents = category => {
    setTimeout(() => {
      const event = category === 'all' ? allEvents : allEvents?.filter(event => event.type?.includes(category));
      setEvents(event);
    }, 100);
  };
  const guests = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
  const {
    isTrue: isOpen,
    toggle
  } = useToggle();
  const eventFormSchema = yup.object({
    title: yup.string().required('Please enter event title'),
    description: yup.string().required('Please enter event description'),
    duration: yup.string().required('Please enter event duration'),
    location: yup.string().required('Please enter event location'),
    guest: yup.string().email('Please enter valid email').required('Please enter event guest email')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(eventFormSchema)
  });
  return <>
      <Card className="h-100">
        <CardHeader className="d-sm-flex align-items-center text-center justify-content-sm-between border-0 pb-0">
          <h1 className="h4 card-title">Discover Events</h1>
          <Button variant="primary-soft" onClick={toggle}>
            
            <FaPlus className="pe-1" /> Create event
          </Button>
        </CardHeader>
        <CardBody>
          <TabContainer defaultActiveKey="all">
            <Nav className="nav-tabs nav-bottom-line justify-content-center justify-content-md-start">
              <NavItem>
                
                <NavLink eventKey="all" onClick={() => filterEvents('all')}>
                  
                  Top
                </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="local" onClick={() => filterEvents('local')}>
                  
                  Local
                </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="this-week" onClick={() => filterEvents('this-week')}>
                  
                  This week
                </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="online" onClick={() => filterEvents('online')}>
                  
                  Online
                </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="friends" onClick={() => filterEvents('friends')}>
                  
                  Friends
                </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="following" onClick={() => filterEvents('following')}>
                  
                  Following
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="mb-0 pb-0">
              {eventCategories.map((category, idx) => <Fragment key={idx}>
                  {events.length != 0 ? <TabPane eventKey={category} className="fade" id="tab-1">
                      <Row className="g-4">
                        {events?.map((event, idx) => <Col sm={6} xl={4} key={idx}>
                            <EventCard {...event} />
                          </Col>)}
                      </Row>
                    </TabPane> : <TabPane eventKey={category} className="fade text-center" id="tab-5">
                      <div className="my-sm-5 py-sm-5">
                        <BsCalendar2Event className="display-1 text-body-secondary"> </BsCalendar2Event>
                        <h4 className="mt-2 mb-3 text-body">No events found</h4>
                        <Button variant="primary-soft" size="sm" onClick={toggle}>
                          
                          Click here to add
                        </Button>
                      </div>
                    </TabPane>}
                </Fragment>)}
            </TabContent>
          </TabContainer>
        </CardBody>
      </Card>

      <Modal show={isOpen} onHide={toggle} centered className="fade" id="modalCreateEvents" tabIndex={-1} aria-labelledby="modalLabelCreateEvents" aria-hidden="true">
        <form onSubmit={handleSubmit(() => {})}>
          <ModalHeader closeButton>
            <h5 className="modal-title" id="modalLabelCreateEvents">
              Create event
            </h5>
          </ModalHeader>
          <ModalBody>
            <Row className="g-4">
              <TextFormInput name="title" label="Title" placeholder="Event name here" containerClassName="col-12" control={control} />
              <TextAreaFormInput name="description" label="Description" rows={2} placeholder="Ex: topics, schedule, etc." containerClassName="col-12" control={control} />

              <Col sm={4}>
                <label className="form-label">Date</label>
                <DateFormInput options={{
                enableTime: false
              }} type="text" className="form-control" placeholder="Select date" />
              </Col>
              <div className="col-sm-4">
                <label className="form-label">Time</label>
                <DateFormInput options={{
                enableTime: true,
                noCalendar: true
              }} type="text" className="form-control" placeholder="Select time" />
              </div>
              <TextFormInput name="duration" label="Duration" placeholder="1hr 23m" containerClassName="col-sm-4" control={control} />
              <TextFormInput name="location" label="Location" placeholder="Logansport, IN 46947" containerClassName="col-12" control={control} />
              <TextFormInput name="guest" type="email" label="Add guests" placeholder="Guest email" containerClassName="col-12" control={control} />
              <Col xs={12} className="mt-3">
                <ul className="avatar-group list-unstyled align-items-center mb-0">
                  {guests.map((avatar, idx) => <li className="avatar avatar-xs" key={idx}>
                      <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
                    </li>)}
                  <li className="ms-3">
                    <small> +50 </small>
                  </li>
                </ul>
              </Col>
              <div className="mb-3">
                <DropzoneFormInput showPreview helpText="Drop presentation and document here or click to upload." icon={BsFileEarmarkText} label="Upload attachment" />
              </div>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger-soft" type="button" className="me-2" onClick={toggle}>
              
              Cancel
            </Button>
            <Button variant="success-soft" type="submit">
              Create now
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>;
};
export default AllEvents;