import LoadContentButton from '@/components/LoadContentButton';
import { timeSince } from '@/utils/date';
import clsx from 'clsx';
import { useAuthContext } from '@/context/useAuthContext';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { BsReplyFill, BsSendFill } from 'react-icons/bs'; // Reply icons
import { postReply } from '@/api/feed'; // Assuming this function sends a reply to the backend
import { getReply } from "@/api/feed"; // API call to fetch replies

const CommentItem = ({
  comment,
  likesCount,
  children = [],
  socialUser,
  createdAt,
  image,
  commentId,
}) => {
  const [userReply, setUserReply] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState(children || []);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(children?.length > 0);
  const { user } = useAuthContext();

  const profile_id = user.profile_id;

  // Handle the reply form toggle
  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  // Fetch replies dynamically
  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const fetchedReplies = await getReply(commentId);
      setReplies(fetchedReplies);
      console.log(fetchedReplies);
      
      setRepliesLoaded(true);
    } catch (error) {
      console.error("Error fetching replies:", error);
    } finally {
      setLoadingReplies(false);
    }
  };

  useEffect(() => {
    if (replies?.length === 0 && !repliesLoaded) {
      fetchReplies();
    }
  }, []);

  // Handle submitting a reply
  const handleReply = async (e) => {
    e.preventDefault();
    if (!userReply.trim()) return;

    try {
      const newReply = await postReply(profile_id, commentId, userReply);
      setReplies([...replies, newReply]);
      setUserReply('');
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <li className="comment-item" style={{ margin: '15px 0px' }}>
      {/* Comment Details */}
      {socialUser && (
        <>
          <div className="d-flex position-relative">
            <div
              className={clsx('avatar avatar-xs', {
                'avatar-story': socialUser.isStory,
              })}
            >
              <span role="button">
                <img
                  className="avatar-img rounded-circle"
                  src={socialUser.avatar}
                  alt={socialUser.name + '-avatar'}
                />
              </span>
            </div>
            <div className="ms-2">
              <div className="bg-light rounded-start-top-0 p-3 rounded">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-1">
                    <Link to="">{socialUser.name}</Link>
                  </h6>
                  <small className="ms-2">{timeSince(createdAt)}</small>
                </div>
                <p className="small mb-0">{comment}</p>
                {image && (
                  <Card className="p-2 border border-2 rounded mt-2 shadow-none">
                    <img width={172} height={277} src={image} alt="" />
                  </Card>
                )}
              </div>

              <ul className="nav nav-divider py-2 small">
                <li className="nav-item">
                  <span className="nav-link" role="button">
                    Like ({likesCount})
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    role="button"
                    onClick={() => {
                      toggleReplyForm();
                      if (!repliesLoaded) fetchReplies();
                    }}
                  >
                    <BsReplyFill size={18} className="pe-1" />
                    Reply
                  </span>
                </li>
                {replies?.length > 0 && (
                  <li className="nav-item">
                    <span className="nav-link" role="button">
                      View {replies?.length} replies
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <form className="d-flex align-items-center mt-3" onSubmit={handleReply}>
              <textarea
                className="form-control pe-5 bg-light"
                rows={2}
                placeholder="Write your reply..."
                value={userReply}
                onChange={(e) => setUserReply(e.target.value)}
              />
              <button className="btn btn-primary ms-2" type="submit">
                <BsSendFill />
              </button>
            </form>
          )}

          {/* Nested Replies */}
          <ul className="comment-item-nested list-unstyled">
            {loadingReplies && <p>Loading replies...</p>}
            {replies.map((childComment) => (
              <CommentItem key={childComment.id} {...childComment} />
            ))}
          </ul>
        </>
      )}
    </li>
  );
};

export default CommentItem;
