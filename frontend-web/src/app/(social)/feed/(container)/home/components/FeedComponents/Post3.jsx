import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
} from "react-bootstrap";
import {
  BsBookmarkCheck,
  BsChatFill,
  BsEnvelope,
  BsHeart,
  BsLink,
  BsPencilSquare,
  BsReplyFill,
  BsSendFill,
  BsShare,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import ActionMenu from "./ActionMenu.jsx";
import CommentItem from "@/components/cards/components/CommentItem.jsx";
import { postComment, getComment } from "@/api/feed.js";
import { useAuthContext } from "@/context/useAuthContext";
import { useProfileContext } from "@/context/useProfileContext";
import { useState, useEffect, useRef,memo } from "react";


const LazyImage = ({ src, alt, onClick }) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const style = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    opacity: isLoaded ? 1 : 0, // Set opacity to 0 initially, 1 when loaded
    transform: isLoaded ? "scale(1)" : "scale(0.8)", // Scale image when loaded
    transition: "opacity 0.5s ease-in-out, transform 0.3s ease", // Apply transitions
  };

  return (
    <img
      ref={imgRef}
      src={isInView ? src : ""}
      alt={alt}
      style={style}
      onClick={onClick}
      loading="lazy"
      onLoad={() => setIsLoaded(true)} // Set loaded state on image load
    />
  );
};


const Post3 = memo(({
  postId,
  createdAt,
  likesCount,
  caption,
  comments,
  commentsCount,
  image,
  socialUser,
  photos,
  isVideo,
}) => {
  const { user } = useAuthContext();
  const profile_id = user.profile_id;
  const { profile } = useProfileContext();
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [like, setLike] = useState(false);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [commentsState, setCommentsState] = useState(comments);
  const username = user.username;
  const [showComments, setShowComments] = useState(false);
  // Function to handle modal opening
  useEffect(() => {
    const fetchComments = async () => {
      const postComments = await getComment(postId);
      setCommentsState(postComments);
    };
    fetchComments();
  }, []);

  const handleImageClick = (img) => {
    setModalImage(img);
    setShowModal(true);
  };
  const handleShowComments = async () => {
    setShowComments(!showComments);
    const postComments = await getComment(postId);
    setCommentsState(postComments);
  };
  // Function to handle modal closing
  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage(null);
  };
  const handleLike = () => {
    setLike(!like);
  };
  const handleComment = async (e, data) => {
    e.preventDefault();
    postComment(postId, profile_id, data);
    setCommentsState([
      ...commentsState,
      {
        comment: data,
        createdAt: new Date(),
        socialUser: {
          avatar: `https://res.cloudinary.com/${cloudName}/${profile.avatar_image}`,
          name: username,
        },
      },
    ]);
  };
  const [userComment, setUserComment] = useState("");
  return (
    <>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-2">
                <span role="button">
                  <img
                    className="avatar-img rounded-circle"
                    src={socialUser?.avatar}
                    alt="logo"
                  />
                </span>
              </div>
              <div>
                <h6 className="card-title mb-0">
                  <Link to=""> {socialUser?.name} </Link>
                </h6>
                <p className="small mb-0">{createdAt}</p>
              </div>
            </div>
            <ActionMenu />
          </div>
        </CardHeader>
        <CardBody>
          <p className="mb-0">{caption}</p>
        </CardBody>

        {image && (
          <span role="button">
            <LazyImage
              src={image}
              alt="post-image"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              onClick={() => handleImageClick(image)}
            />
          </span>
        )}

        {/* <CardBody className="position-relative bg-light">
        <Link to="" className="small stretched-link">
          https://blogzine.webestica.com
        </Link>
        <h6 className="mb-0 mt-1">
          Blogzine - Blog and Magazine Bootstrap 5 Theme
        </h6>
        <p className="mb-0 small">
          Bootstrap based News, Magazine and Blog Theme
        </p>
      </CardBody> */}

        <CardFooter className="py-3">
          <ul className="nav nav-fill nav-stack small">
            <li className="nav-item">
              <Link
                className={`nav-link mb-0 ${like ? "active" : ""}`}
                to=""
                onClick={handleLike}
              >
                <BsHeart size={18} className="pe-1" />
                Liked ({likesCount})
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link mb-0"
                to=""
                onClick={handleShowComments}
              >
                <BsChatFill size={18} className="pe-1" />
                Comments ({commentsCount})
              </Link>
            </li>

            <Dropdown className="nav-item">
              <DropdownToggle
                as="a"
                className="nav-link mb-0 content-none cursor-pointer"
                id="cardShareAction6"
                aria-expanded="false"
              >
                <BsReplyFill className="flip-horizontal ps-1" size={18} />
                Share (3)
              </DropdownToggle>

              <DropdownMenu
                className="dropdown-menu-end"
                aria-labelledby="cardShareAction6"
              >
                <li>
                  <DropdownItem>
                    <BsEnvelope size={22} className="fa-fw pe-2" />
                    Send via Direct Message
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem>
                    <BsBookmarkCheck size={22} className="fa-fw pe-2" />
                    Bookmark
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem>
                    <BsLink size={22} className="fa-fw pe-2" />
                    Copy link to post
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem>
                    <BsShare size={22} className="fa-fw pe-2" />
                    Share post via …
                  </DropdownItem>
                </li>
                <li>
                  <DropdownDivider />
                </li>
                <li>
                  <DropdownItem>
                    <BsPencilSquare size={22} className="fa-fw pe-2" />
                    Share to News Feed
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </Dropdown>

            <li className="nav-item">
              <Link className="nav-link mb-0" to="">
                <BsSendFill size={18} className="pe-1" />
                Send
              </Link>
            </li>
          </ul>
        </CardFooter>
      </Card>
      <div className="px-4">
        <div className="d-flex">
          <div className="avatar avatar-xs me-2">
            <span role="button">
              <img
                className="avatar-img rounded-circle"
                src={`https://res.cloudinary.com//${cloudName}/${profile.avatar_image}`}
                alt="avatar12"
              />
            </span>
          </div>

          <form
            className="nav nav-item w-100 position-relative"
            onSubmit={(e) => handleComment(e, userComment)}
          >
            <textarea
              data-autoresize
              className="form-control pe-5 bg-light"
              rows={1}
              placeholder="Add a comment..."
              defaultValue={""}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <button
              className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
              type="submit"
            >
              <BsSendFill />
            </button>
          </form>
        </div>
      </div>
      {commentsState && showComments && (
        <>
          <ul className="comment-wrap list-unstyled">
            {commentsState.map((comment) => (
              <CommentItem
                {...comment}
                key={commentsState.comment + commentsState.commentId}
              />
            ))}
          </ul>
        </>
      )}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Post Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalImage} alt="modal-img" style={{ width: "100%" }} />
        </Modal.Body>
      </Modal>
    </>
  );
});

export default Post3;
