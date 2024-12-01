import clsx from "clsx";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { fetchUsersToFollow, followUser } from "@/api/social";
import { useState, useEffect,useRef } from "react";
import { useAuthContext } from "@/context/useAuthContext";
import { createChat } from "@/api/multimedia";
import { useNotificationContext } from "@/context/useNotificationContext";
import FollowSound from '@/assets/audio/follow-sound.wav'
  
const Followers = () => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const { showNotification } = useNotificationContext();
  const { user } = useAuthContext();
  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }

  const currentUserId = user.profile_id;

  const fetchData = async () => {
    try {
      const data = await fetchUsersToFollow();
      console.log("Fetched users to follow:", data);
      setUsersToFollow(data);
    } catch (error) {
      console.error("Error fetching users to follow:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewMore = () => {
    setIsExpanded(true);
    setVisibleCount(usersToFollow.length);
  };

  const handleViewLess = () => {
    setIsExpanded(false);
    setVisibleCount(5);
  };


  const handleFollow = async ({ followerId, followerName }) => {
    try {
      const followData = {
        follower: currentUserId,
        followed: followerId,
      };
      console.log(followData);
      await followUser(followData);
      await createChat(followerId);

      // Remove followed user from the list
      setUsersToFollow((prev) => prev.filter((user) => user.id !== followerId));
      playAudio()
      showNotification({
        message: `You started following ${followerName}.`,
        variant: "success",
      });

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

          return (
            <div className="d-flex gap-3 mb-3" key={idx}>
              <div
                className={clsx("avatar", {
                  "border-primary": follower.role === "student",
                  "border-success": follower.role === "alumni",
                  "border-danger": ["college_admin", "college_staff"].includes(
                    follower.role
                  ),
                  "border-secondary": ![
                    "student",
                    "alumni",
                    "college_admin",
                    "college_staff",
                  ].includes(follower.role),
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
                  {follower.role === "student" &&
                    follower.expected_graduation_year && (
                      <p className="small text-muted">
                        Batch of {follower.expected_graduation_year}
                      </p>
                    )}
                </div>
              </div>

              <Button
                variant="primary-soft"
                className="rounded-circle icon-md ms-auto flex-centered"
                onClick={() =>
                  handleFollow({
                    followerId: follower.id,
                    followerName: follower.full_name,
                  })
                }
              >
                <FaPlus />
              </Button>
              <audio ref={audioPlayer} src={FollowSound } />
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
