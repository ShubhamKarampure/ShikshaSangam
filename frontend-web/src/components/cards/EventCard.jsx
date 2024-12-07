import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import {
  BsBookmarkCheck,
  BsCalendarCheck,
  BsEnvelope,
  BsGeoAlt,
  BsPeople,
  BsPerson,
  BsShare,
  BsShareFill,
} from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";
const EventCard = ({
  attendees,
  category,
  date,
  image,
  location,
  title,
  label,
  id,
}) => {
  const dateObj = new Date(date);
  console.log(image);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  return (
    <Card className="h-100">
      <div className="position-relative">
        <img
          className="rounded-top"
          src={
            image === "/src/assets/images/avatar/01.jpg"
              ? image
              : `https://res.cloudinary.com/${cloudName}/${image}`
          }
          alt="image"
          style={{
            width: "100%", // Ensure it takes full width of the parent container
            height: "200px", // Specify the height to maintain consistency
            objectFit: "cover", // Ensures the image scales properly without distortion
          }}
        />
        {label && (
          <div className="badge bg-danger text-white mt-2 me-2 position-absolute top-0 end-0">
            {label}
          </div>
        )}
      </div>

      <CardBody className="position-relative pt-0">
        <Link className="btn btn-xs btn-primary mt-n3" to="/event/details">
          {category}
        </Link>
        <h5 className="mt-3">
          <Link to={`/feed/events/${id}`}> {title} </Link>
        </h5>

        <p className="mb-0 small">
          <BsCalendarCheck size={17} className="pe-1" />
          {dateObj.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}{" "}
          at
          {" " +
            dateObj.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
        </p>
        {title === "offline" ? (
          <p className="small">
            <BsGeoAlt size={17} className="pe-1" /> {location}
          </p>
        ) : (
          <div className="m-3"></div>
        )}

        <ul className="avatar-group list-unstyled align-items-center mb-0">
          {attendees.map((avatar, idx) => (
            <li className="avatar avatar-xs" key={idx}>
              <img
                className="avatar-img rounded-circle"
                src={avatar}
                alt="avatar"
              />
            </li>
          ))}
          <li className="avatar avatar-xs">
            <div className="avatar-img rounded-circle bg-primary">
              <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                +{Math.floor(Math.random() * 100)}
              </span>
            </div>
          </li>
          <li className="ms-3">
            <small> are attending</small>
          </li>
        </ul>

        <div className="d-flex mt-3 justify-content-between">
          <div className="w-100">
            <input
              type="checkbox"
              className="btn-check d-block"
              id={`Interested${id}`}
            />
            <label
              className="btn btn-sm btn-outline-success d-block"
              htmlFor={`Interested${id}`}
            >
              <span className="icons-center gap-1">
                <FaThumbsUp size={12} className="me-1" /> Interested
              </span>
            </label>
          </div>
          <Dropdown className="ms-3">
            <DropdownToggle
              as="a"
              className="btn btn-sm btn-primary-soft content-none"
              id="eventActionShare"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsShareFill />
            </DropdownToggle>

            <DropdownMenu
              className="dropdown-menu-end"
              aria-labelledby="eventActionShare"
            >
              <li>
                <DropdownItem>
                  <BsEnvelope size={18} className="fa-fw pe-1" /> Send via
                  Direct Message
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsBookmarkCheck size={18} className="fa-fw pe-1" /> Share to
                  News Feed
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsPeople size={18} className="fa-fw pe-1" /> Share to a group
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsShare size={18} className="fa-fw pe-1" /> Share post via …
                </DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem>
                  <BsPerson size={18} className="fa-fw pe-1" /> Share on a
                  friend&apos;s profile
                </DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  );
};
export default EventCard;
