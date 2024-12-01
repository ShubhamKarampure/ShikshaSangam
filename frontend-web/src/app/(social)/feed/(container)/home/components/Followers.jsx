import clsx from "clsx";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { fetchUsersToFollow, followUser } from "@/api/social";  // Import followUser
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/useAuthContext";

const Followers = () => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [followedUsers, setFollowedUsers] = useState(new Set()); // Track followed users by their ID
  const [visibleCount, setVisibleCount] = useState(5);  // Track number of visible users
  const [isExpanded, setIsExpanded] = useState(false); // Track whether users list is expanded or collapsed
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const { user } = useAuthContext();
  const currentUserId = user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsersToFollow();
        console.log("Fetched users to follow:", data);
        setUsersToFollow(data);
      } catch (error) {
        console.error("Error fetching users to follow:", error);
      }
    };
    fetchData();
  }, []);

  // Handle "View more" button click
  const handleViewMore = () => {
    setIsExpanded(true); // Set expanded state to true
    setVisibleCount(usersToFollow.length); // Show all users
  };

  // Handle "View less" button click
  const handleViewLess = () => {
    setIsExpanded(false); // Set expanded state to false
    setVisibleCount(5); // Reset to initial number of users
  };

  // Handle follow button click
  const handleFollow = async (followerId) => {
    try {
      const followData = {
        follower: currentUserId, // Current user's ID
        followed: followerId,    // The ID of the user to follow
      };
      await followUser(followData);  // API call to follow the user
      setFollowedUsers((prev) => new Set(prev).add(followerId)); // Update followed users
      console.log(`Followed user with ID: ${followerId}`);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-0 border-0">
        <CardTitle className="mb-0">Who to follow</CardTitle>
      </CardHeader>

      <CardBody>
        {usersToFollow?.slice(0, visibleCount).map((follower, idx) => {
          const avatarUrl =
            follower.avatar_image && cloudName
              ? `${follower.avatar_image}`
              : `https://ui-avatars.com/api/?name=${follower.full_name}&background=0D8ABC&color=fff`;

          const fullName = follower.full_name || "No username";
          const specialization = follower.specialization || follower.role;

          const isFollowed = followedUsers.has(follower.id); // Check if the user is followed

          return (
            <div className="d-flex gap-3 mb-3" key={idx}>
              <div
                className={clsx("avatar", {
                  "border-primary": follower.role === "student",
                  "border-success": follower.role === "alumni",
                  "border-danger": ["college_admin", "college_staff"].includes(follower.role),
                  "border-secondary": !["student", "alumni", "college_admin", "college_staff"].includes(follower.role),
                })}
                style={{
                  borderRadius: "50%",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  width: "60px",
                  height: "60px",
                }}
              >
                <img
                  className="avatar-img rounded-circle"
                  src={avatarUrl}
                  alt="avatar"
                  style={{ borderRadius: "50%", width: "100%", height: "100%" }}
                />
              </div>

              <div className="overflow-hidden d-flex flex-column justify-content-center">
                <div>
                  <Link className="h6 mb-0" to="">
                    {fullName}
                  </Link>
                  <p className="mb-0 small text-truncate">{specialization}</p>
                  {follower.role === "alumni" && follower.graduation_year && (
                    <p className="small text-muted">
                      Batch of {follower.graduation_year}
                    </p>
                  )}
                  {follower.role === "student" && follower.expected_graduation_year && (
                    <p className="small text-muted">
                      Batch of {follower.expected_graduation_year}
                    </p>
                  )}
                </div>
              </div>

              {/* Follow button */}
              <Button
                variant={isFollowed ? "success" : "primary-soft"} // Change button color to green when followed
                className="rounded-circle icon-md ms-auto flex-centered"
                onClick={() => handleFollow(follower.id)}  // Trigger follow on click
              >
                <FaPlus />
              </Button>
            </div>
          );
        })}

        <div className="d-grid mt-3">
          {isExpanded ? (
            <Button variant="primary-soft" size="sm" onClick={handleViewLess}>
              View less
            </Button>
          ) : (
            <Button variant="primary-soft" size="sm" onClick={handleViewMore}>
              View more
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Followers;
