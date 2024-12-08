import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
} from "react-bootstrap";
import { useAuthContext } from "@/context/useAuthContext";
import { useNotificationContext } from "@/context/useNotificationContext";
import { fetchUsersToFollow, followUser } from "@/api/social";
import FollowSound from "@/assets/audio/follow-sound.mp3";
import AnimatedFollowButton from "./FollowButton";
import UploadResume from "./UploadResume";

const Followers = () => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        console.log(data);
        setUsersToFollow(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users to follow:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      if (!searchQuery) {
        setFilteredUsers(usersToFollow);
        return;
      }

      const normalizedQuery = searchQuery.toLowerCase();
      const filtered = usersToFollow.filter(
        (user) =>
          user.full_name.toLowerCase().includes(normalizedQuery) ||
          (user.specialization &&
            user.specialization.toLowerCase().includes(normalizedQuery))
      );
      setFilteredUsers(filtered);

      setVisibleCount(5);
      setIsExpanded(false);
    };

    filterUsers();
  }, [searchQuery, usersToFollow]);

  const playAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.play();
    }
  };

  const handleFollow = async ({ followerId, followerName }) => {
    setLoadingUsers((prev) => ({ ...prev, [followerId]: true }));

    try {
      const followData = { follower: currentUserId, followed: followerId };
      await followUser(followData);

      setFollowedUsers((prev) => ({ ...prev, [followerId]: true }));
      setLoadingUsers((prev) => ({ ...prev, [followerId]: false }));

      playAudio();

      showNotification({
        message: `You started following ${followerName}.`,
        variant: "success",
      });

      setTimeout(() => {
        setUsersToFollow((prev) =>
          prev.filter((user) => user.id !== followerId)
        );
      }, 1000);
    } catch (error) {
      console.error("Error following user:", error);
      setLoadingUsers((prev) => ({ ...prev, [followerId]: false }));
    }
  };

  const handleViewMore = () => {
    setIsExpanded(true);
    setVisibleCount(filteredUsers.length);
  };

  const handleViewLess = () => {
    setIsExpanded(false);
    setVisibleCount(5);
  };

  return (
    <Card>
      <CardBody>
       <div
    className="text-muted p-1">
    <h4 className="fw-bold">Who to Follow</h4>
  </div>
        <UploadResume />


        <Form className="mb-3">
          <FormControl
            type="text"
            placeholder="Search by name/field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3"
          />
        </Form>

        {filteredUsers.length === 0 ? (
          <p className="text-center text-muted">No users found</p>
        ) : (
          <AnimatePresence>
            {filteredUsers.slice(0, visibleCount).map((follower) => {
              const avatarUrl =
                follower.avatar_image && cloudName
                  ? follower.avatar_image
                  : `https://ui-avatars.com/api/?name=${follower.full_name}&background=0D8ABC&color=fff`;

              return (
                <motion.div
                  key={follower.id}
                  layout
                  className="d-flex justify-content-between align-items-center mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="d-flex gap-2 align-items-center" style={{width:'70%'}}>
                    <div
                      className={clsx("avatar", {
                        "border-primary": follower.role === "student",
                        "border-success": follower.role === "alumni",
                        "border-danger": [
                          "college_admin",
                          "college_staff",
                        ].includes(follower.role),
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
                        width: "45px",
                        height: "45px",
                      }}
                    >
                      <img
                        className="avatar-img rounded-circle"
                        src={avatarUrl}
                        alt="avatar"
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>

                    <div
                      className="overflow-hidden"
                      style={{ maxWidth: "70%" }}
                    >
                      <Link
                        className="h6 mb-0 text-truncate"
                        to={`/profile/feed/${follower.id}`}
                        style={{
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {follower.full_name || follower.username}
                      </Link>
                      <p
                        className="mb-0 small text-truncate"
                        style={{
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {follower.specialization || follower.role}
                      </p>
                      {follower.role === "alumni" &&
                        follower.graduation_year && (
                          <p
                            className="small text-muted text-truncate"
                            style={{
                              display: "block",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            Batch of {follower.graduation_year}
                          </p>
                        )}
                      {follower.role === "student" &&
                        follower.expected_graduation_year && (
                          <p
                            className="small text-muted text-truncate"
                            style={{
                              display: "block",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            Batch of {follower.expected_graduation_year}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="text-end">
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
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {filteredUsers.length > 5 && (
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

        <audio ref={audioPlayer} src={FollowSound} />
      </CardBody>
    </Card>
  );
};

export default Followers;
