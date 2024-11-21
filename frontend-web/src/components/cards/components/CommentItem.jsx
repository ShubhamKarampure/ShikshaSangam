import LoadContentButton from '@/components/LoadContentButton';
import { timeSince } from '@/utils/date';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
const CommentItem = ({
  comment,
  likesCount,
  children,
  socialUser,
  createdAt,
  image
}) => {
  return <li className="comment-item">
      {socialUser && <>
          <div className="d-flex position-relative">
            <div className={clsx('avatar avatar-xs', {
          'avatar-story': socialUser.isStory
        })}>
              <span role="button">
                <img className="avatar-img rounded-circle" src={socialUser.avatar} alt={socialUser.name + '-avatar'} />
              </span>
            </div>
            <div className="ms-2">
              <div className="bg-light rounded-start-top-0 p-3 rounded">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-1">
                    
                    <Link to=""> {socialUser.name} </Link>
                  </h6>
                  <small className="ms-2">{timeSince(createdAt)}</small>
                </div>
                <p className="small mb-0">{comment}</p>
                {image && <Card className="p-2 border border-2 rounded mt-2 shadow-none">
                    <img width={172} height={277} src={image} alt="" />
                  </Card>}
              </div>

              <ul className="nav nav-divider py-2 small">
                <li className="nav-item">
                  <span className="nav-link" role="button">
                    
                    Like ({likesCount})
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" role="button">
                    
                    Reply
                  </span>
                </li>
                {children?.length && children?.length > 0 && <li className="nav-item">
                    <span className="nav-link" role="button">
                      
                      View {children?.length} replies
                    </span>
                  </li>}
              </ul>
            </div>
          </div>

          <ul className="comment-item-nested list-unstyled">
            {children?.map(childComment => <CommentItem key={childComment.id} {...childComment} />)}
          </ul>
          {children?.length === 2 && <LoadContentButton name="Load more replies" className="mb-3 ms-5" />}
        </>}
    </li>;
};
export default CommentItem;