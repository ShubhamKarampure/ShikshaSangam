import useToggle from "@/hooks/useToggle";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useState, useEffect } from "react";
import {
  Button,Card,CardBody,CardHeader,Col,Nav,NavItem,NavLink,Row,TabContainer,TabContent,TabPane,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsCalendar2Event } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import * as yup from "yup";
import EventCard from "@/components/cards/EventCard";
import { eventData } from "@/assets/data/social";
import avatar1 from "@/assets/images/avatar/01.jpg";
import avatar2 from "@/assets/images/avatar/02.jpg";
import avatar3 from "@/assets/images/avatar/03.jpg";
import avatar4 from "@/assets/images/avatar/04.jpg";
import avatar5 from "@/assets/images/avatar/05.jpg";
import avatar6 from "@/assets/images/avatar/06.jpg";
import avatar7 from "@/assets/images/avatar/07.jpg";
import { fetchEvents } from "@/api/events";
import CreateEventForm from "./CreateEventForm";

const mapEventToCardFormat = (event) => {
  return {
    id: event.id.toString(), // Ensure it's a string
    title: event.name || "Untitled Event",
    category: event.type || "General",
    image: event.poster || avatar1,
    label: event.mode || "Offline",
    date: new Date(event.date_time).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    location: event.location || "Not Specified",
    attendees: Array(event.registrations_count || 0).fill(avatar1), // Use placeholder avatars for attendees
    type: event.mode || "offline",
  };
};

const AllEvents = () => {
  const eventCategories = ["all", "online"];

  // const allEvents = useFetchData(getAllEvents)
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to manage loading
  const [events, setEvents] = useState([]);
  const [filterEventsState, setFilterEventsState] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await fetchEvents(); // Fetch events from API
        console.log("Raw events:", response);

        // Transform events to match the card format
        const transformedEvents = response.results.map(mapEventToCardFormat);
        console.log("Transformed events:", transformedEvents);

        setEvents(transformedEvents); // Update state with transformed events
      } catch (err) {
        setError(err.message || "Failed to fetch events");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const filterEvents = (category) => {
    setTimeout(() => {
      const event =
        category === "all"
          ? events
          : events?.filter((event) => event.label?.includes(category));
      setFilterEventsState(event);
    }, 100);
  };
  const guests = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
  ];
  const { isTrue: isOpen, toggle } = useToggle();
  const eventFormSchema = yup.object({
    title: yup.string().required("Please enter event title"),
    description: yup.string().required("Please enter event description"),
    duration: yup.string().required("Please enter event duration"),
    location: yup.string().required("Please enter event location"),
    guest: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter event guest email"),
  });
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(eventFormSchema),
  });
  return (
    <>
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
                <NavLink eventKey="all" onClick={() => filterEvents("all")}>
                  All
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  eventKey="online"
                  onClick={() => filterEvents("online")}
                >
                  Online
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  eventKey="offline"
                  onClick={() => filterEvents("offline")}
                >
                  Offline
                </NavLink>
              </NavItem>
              <NavItem></NavItem>
            </Nav>
            <TabContent className="mb-0 pb-0">
              {eventCategories.map((category, idx) => (
                <Fragment key={idx}>
                  {events.length != 1 ? (
                    <TabPane eventKey={category} className="fade" id="tab-1">
                      <Row className="g-4">
                        {events?.map((event, idx) => (
                          <Col sm={6} xl={4} key={idx}>
                            <EventCard {...event} />
                          </Col>
                        ))}
                      </Row>
                    </TabPane>
                  ) : (
                    <TabPane
                      eventKey={category}
                      className="fade text-center"
                      id="tab-5"
                    >
                      <div className="my-sm-5 py-sm-5">
                        <BsCalendar2Event className="display-1 text-body-secondary">
                          {" "}
                        </BsCalendar2Event>
                        <h4 className="mt-2 mb-3 text-body">No events found</h4>
                        <Button
                          variant="primary-soft"
                          size="sm"
                          onClick={toggle}
                        >
                          Click here to add
                        </Button>
                      </div>
                    </TabPane>
                  )}
                </Fragment>
              ))}
            </TabContent>
          </TabContainer>
        </CardBody>
      </Card>
      <CreateEventForm
        isOpen={isOpen}
        toggle={toggle}
        guests={guests}
        control={control}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
export default AllEvents;
