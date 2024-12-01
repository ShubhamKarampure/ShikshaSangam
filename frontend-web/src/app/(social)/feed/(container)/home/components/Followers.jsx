import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Button, Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import { useAuthContext } from "@/context/useAuthContext";
import { useNotificationContext } from "@/context/useNotificationContext";
import { fetchUsersToFollow, followUser } from "@/api/social";
import { createChat } from "@/api/multimedia";
import FollowSound from "@/assets/audio/follow-sound.mp3";
import AnimatedFollowButton from "./FollowButton";

const Followers = () => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState({});
  const [followedUsers, setFollowedUsers] = useState({});

  const { user } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const audioPlayer = useRef(null);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const currentUserId = user.profile_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsersToFollow();
        setUsersToFollow(data);
      } catch (error) {
        console.error("Error fetching users to follow:", error);
      }
    };
    fetchData();
  }, []);

  const playAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.play();
    }
  };

  const handleFollow = async ({ followerId, followerName }) => {
    // Set loading state for this specific user
    setLoadingUsers((prev) => ({ ...prev, [followerId]: true }));

    try {
      const followData = { follower: currentUserId, followed: followerId };
      await followUser(followData);
      await createChat(followerId);

      // Mark as followed and stop loading
      setFollowedUsers((prev) => ({ ...prev, [followerId]: true }));
      setLoadingUsers((prev) => ({ ...prev, [followerId]: false }));

      playAudio();

      // Show notification
      showNotification({
        message: `You started following ${followerName}.`,
        variant: "success",
      });

      // Remove the followed user after a delay
      setTimeout(() => {
        setUsersToFollow((prev) =>
          prev.filter((user) => user.id !== followerId)
        );
      }, 1000); // Adjust delay as needed
    } catch (error) {
      console.error("Error following user:", error);
      // Reset loading state if there's an error
      setLoadingUsers((prev) => ({ ...prev, [followerId]: false }));
    }
  };

  const handleViewMore = () => {
    setIsExpanded(true);
    setVisibleCount(usersToFollow.length);
  };

  const handleViewLess = () => {
    setIsExpanded(false);
    setVisibleCount(5);
  };

  const userCardVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginBottom: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginBottom: 12,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Card>
      <CardHeader className="pb-0 border-0">
        <CardTitle className="mb-0">Who to Follow</CardTitle>
      </CardHeader>

      <CardBody>
        <AnimatePresence>
          {usersToFollow.slice(0, visibleCount).map((follower, idx) => {
            const avatarUrl =
              follower.avatar_image && cloudName
                ? follower.avatar_image
                : `https://ui-avatars.com/api/?name=${follower.full_name}&background=0D8ABC&color=fff`;

            return (
              <motion.div
                key={follower.id}
                layout
                variants={userCardVariants}
                initial="visible"
                animate="visible"
                exit="hidden"
                className="d-flex gap-3 mb-3"
              >
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
                      {follower.full_name || "No username"}
                    </Link>
                    <p className="mb-0 small text-truncate">
                      {follower.specialization || follower.role}
                    </p>
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

                <AnimatedFollowButton
                  initialFollowState={followedUsers[follower.id] || false}
                  isLoading={loadingUsers[follower.id] || false}
                  onFollowChange={() =>
                    handleFollow({
                      followerId: follower.id,
                      followerName: follower.full_name,
                    })
                  }
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {usersToFollow.length > 5 && (
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
        )}

        {/* Audio Player for Follow Sound */}
        <audio ref={audioPlayer} src={FollowSound} />
      </CardBody>
    </Card>
  );
};

export default Followers;
