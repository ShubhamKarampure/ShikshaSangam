import LoadContentButton from '@/components/LoadContentButton';
import { timeSince } from '@/utils/date';
import clsx from 'clsx';
import { useAuthContext } from '@/context/useAuthContext';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { BsReplyFill, BsSendFill } from 'react-icons/bs'; 
import { getReply,likeContent,unlikeContent,postReply } from "@/api/feed";

const CommentItem = ({
  comment,
  likesCount,
  children = [],
  socialUser,
  createdAt,
  image,
  commentId,
  is_liked,
  replyId,
  fullName
}) => {
  const [userReply, setUserReply] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState(children || []);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(children?.length > 0);
  const { user } = useAuthContext();
  const [likeState,setLikeState] = useState(is_liked);
  const [likeCounter,setLikeCounter] = useState(likesCount);

  const profile_id = user.profile_id;

  // Handle the reply form toggle
  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };  

  const handleShowReply = () => {
    setShowReplies(!showReplies);
  }
  const handleLike = () => {
    if(likeState){
      setLikeCounter(likeCounter-1);
      setLikeState(false);
      unlikeContent((!replyId)?commentId:replyId,(!replyId)?"comment":"reply")
    }else{
      setLikeCounter(likeCounter+1);
      setLikeState(true);
      likeContent((!replyId)?commentId:replyId, profile_id,(!replyId)?21:22);
    }

  };
  // Fetch replies dynamically
  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const fetchedReplies = await getReply(commentId);
      setReplies(fetchedReplies);
      
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
      console.log(replies);
      
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
                    <Link to="">{fullName || socialUser.name}</Link>
                  </h6>
                  <small className="ms-2">{timeSince(createdAt)}</small>
                </div>
                <p className="small mb-0">{comment}</p>
                {image && (
                  <Card className="p-2 border rounded mt-2 shadow-none">
                    <img width={172} height={277} src={image} alt="" />
                  </Card>
                )}
              </div>

              <ul className="nav nav-divider py-2 small">
                <li className="nav-item">
                  <span className={`nav-link ${is_liked?"active":""}`} role="button" onClick={handleLike}>
                    Like ({likeCounter})
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
                    <span className="nav-link" role="button" onClick={handleShowReply}>
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
            {/* {loadingReplies && <p>Loading replies...</p>} */}
            {showReplies && replies.map((childComment) => (
              <CommentItem key={childComment.id} {...childComment} />
            ))}
          </ul>
        </>
      )}
    </li>
  );
};

export default CommentItem;
