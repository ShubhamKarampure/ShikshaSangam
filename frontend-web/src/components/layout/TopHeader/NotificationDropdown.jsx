import { getNotifications, deleteNotification, clearAllNotifications } from "@/api/notifications";
import { followUser } from "@/api/social";
import { timeSince } from "@/utils/date";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { BsBellFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/useAuthContext";

const NotificationDropdown = () => {
  const [allNotifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const currentUserId = user.profile_id;

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        console.log("Notifications fetched successfully:", data);
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Function to handle "Accept" action
  const handleAccept = async (notification) => {
    try {
      const followData = {
        follower: currentUserId,
        followed: notification.follower_userprofile_id,
      };
      console.log(followData);
      await followUser(followData); // Follow the user
      await deleteNotification(notification.id); // Delete the notification
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id)); // Remove from UI
    } catch (error) {
      console.error("Error accepting follow request:", error);
    }
  };

  // Function to handle "Decline" action
  const handleDecline = async (notification) => {
    try {
      console.log(notification.id);
      await deleteNotification(notification.id); // Delete the notification
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id)); // Remove from UI
    } catch (error) {
      console.error("Error declining follow request:", error);
    }
  };

  // Function to handle "Clear All" action
  const handleClearAll = async () => {
    try {
      await clearAllNotifications(); // Clear all notifications
      setNotifications([]); // Clear UI
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <Dropdown
      as="li"
      autoClose="outside"
      className="nav-item ms-2"
      drop="down"
      align="end"
    >
      <DropdownToggle className="content-none nav-link bg-light icon-md btn btn-light p-0">
        {allNotifications.length !== 0 ? (
          <span className="badge-notif animation-blink" />
        ) : null}

        <BsBellFill size={15} />
      </DropdownToggle>
      <DropdownMenu className="dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h6 className="m-0">
              Notifications{" "}
              <span className="badge bg-danger bg-opacity-10 text-danger ms-2">
                {allNotifications.length} new
              </span>
            </h6>
            <Link className="small" to="#" onClick={handleClearAll}>
              Clear all
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            {loading && <div>Loading notifications...</div>}
            {error && <div className="text-danger">{error}</div>}
            {!loading && allNotifications.length === 0 && (
              <div></div>
            )}
            <ul className="list-group list-group-flush list-unstyled p-2">
              {allNotifications?.slice(0, 4).map((notification) => (
                <li key={notification.id}>
                  <div
                    className={clsx(
                      "rounded d-sm-flex border-0 mb-1 p-3 position-relative",
                      {
                        "badge-unread": !notification.is_read,
                      }
                    )}
                  >
                    <div className="avatar text-center">
                      {notification.avatar ? (
                        <img
                          className="avatar-img rounded-circle"
                          src={notification.avatar}
                          alt=""
                        />
                      ) : (
                        <div
                          className={`avatar-img rounded-circle bg-${notification.textAvatar?.variant}`}
                        >
                          <span className="text-white position-absolute top-50 start-50 translate-middle fw-bold">
                            {notification.textAvatar?.text}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mx-sm-3 my-2 my-sm-0">
                      {notification.content && (
                        <div style={{ marginBottom: "0.5rem" }}>
                          {notification.content}
                        </div>
                      )}

                      {notification.notification_type === "follow" && (
                        <div className="d-flex">
                          <Button
                            variant="primary"
                            size="sm"
                            className="py-1 me-2"
                            onClick={() => handleAccept(notification)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="danger-soft"
                            size="sm"
                            className="py-1"
                            onClick={() => handleDecline(notification)}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="small text-nowrap">
                      {timeSince(notification.created_at).slice(0, 10)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
          <CardFooter className="text-center">
            <Button variant="primary-soft" size="sm">
              See all incoming activity
            </Button>
          </CardFooter>
        </Card>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;
