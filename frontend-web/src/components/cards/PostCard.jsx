import { timeSince } from '@/utils/date';
import { Card, CardBody, CardFooter, CardHeader, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { BsBookmark, BsBookmarkCheck, BsChatFill, BsEnvelope, BsFlag, BsHandThumbsUpFill, BsLink, BsPencilSquare, BsPersonX, BsReplyFill, BsSendFill, BsShare, BsSlashCircle, BsThreeDots, BsXCircle } from 'react-icons/bs';
import GlightBox from '../GlightBox';
import LoadContentButton from '../LoadContentButton';
import CommentItem from './components/CommentItem';
import { Link } from 'react-router-dom';
import avatar12 from '@/assets/images/avatar/12.jpg';
import postImg3 from '@/assets/images/post/1by1/03.jpg';
import postImg1 from '@/assets/images/post/3by2/01.jpg';
import postImg2 from '@/assets/images/post/3by2/02.jpg';
import VideoPlayer from './components/VideoPlayer';

const ActionMenu = ({
  name
}) => {
  return <Dropdown>
      <DropdownToggle as="a" className="text-secondary btn btn-secondary-soft-hover py-1 px-2 content-none" id="cardFeedAction">
        <BsThreeDots />
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardFeedAction">
        <li>
          <DropdownItem>
            
            <BsBookmark size={22} className="fa-fw pe-2" />
            Save post
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsPersonX size={22} className="fa-fw pe-2" />
            Unfollow {name}
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsXCircle size={22} className="fa-fw pe-2" />
            Hide post
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsSlashCircle size={22} className="fa-fw pe-2" />
            Block
          </DropdownItem>
        </li>
        <li>
          <DropdownDivider />
        </li>
        <li>
          <DropdownItem>
            
            <BsFlag size={22} className="fa-fw pe-2" />
            Report post
          </DropdownItem>
        </li>
      </DropdownMenu>
    </Dropdown>;
};
const PostCard = ({
  createdAt,
  likesCount,
  caption,
  comments,
  commentsCount,
  image,
  socialUser,
  photos,
  isVideo
}) => {
  return <Card>
      <CardHeader className="border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar avatar-story me-2">
              {socialUser?.avatar && <span role="button">
                  
                  <img className="avatar-img rounded-circle" src={socialUser.avatar} alt={socialUser.name} />
                </span>}
            </div>

            <div>
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">
                  
                  <span role="button">{socialUser?.name} </span>
                </h6>
                <span className="nav-item small"> {createdAt}</span>
              </div>
              <p className="mb-0 small">Web Developer at Webestica</p>
            </div>
          </div>
          <ActionMenu name={socialUser?.name} />
        </div>
      </CardHeader>

      <CardBody>
        {caption && <p>{caption}</p>}

        {image && <img className="card-img" src={image} alt="Post" />}

        {photos && <div className="d-flex justify-content-between">
            <Row className="g-3">
              <Col xs={6}>
                <GlightBox className="h-100" href={postImg3} data-gallery="image-popup">
                  <img className="rounded img-fluid" src={postImg3} alt="Image" />
                </GlightBox>
              </Col>
              <Col xs={6}>
                <GlightBox href={postImg1} data-glightbox data-gallery="image-popup">
                  <img className="rounded img-fluid" src={postImg1} alt="Image" />
                </GlightBox>
                <div className="position-relative bg-dark mt-3 rounded">
                  <div className="hover-actions-item position-absolute top-50 start-50 translate-middle z-index-9">
                    <Link className="btn btn-link text-white" to="">
                      
                      View all
                    </Link>
                  </div>
                  <GlightBox href={postImg2} data-glightbox data-gallery="image-popup">
                    <img className="img-fluid opacity-50 rounded" src={postImg2} alt="image" />
                  </GlightBox>
                </div>
              </Col>
            </Row>
          </div>}
        {isVideo && <VideoPlayer />}
        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <Link className="nav-link active icons-center" to="" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" data-bs-custom-class="tooltip-text-start" data-bs-title="Frances Guerrero<br> Lori Stevens<br> Billy Vasquez<br> Judy Nguyen<br> Larry Lawson<br> Amanda Reed<br> Louis Crawford">
              
              <BsHandThumbsUpFill size={18} className="pe-1" />
              Liked ({likesCount})
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link icons-center" to="">
              
              <BsChatFill size={18} className="pe-1" />
              Comments ({commentsCount})
            </Link>
          </li>

          <Dropdown className="nav-item ms-sm-auto">
            <DropdownToggle as="a" className="nav-link mb-0 content-none icons-center cursor-pointer" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
              <BsReplyFill size={16} className="flip-horizontal ps-1" />
              Share (3)
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction">
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
        </ul>
        {comments && <>
            <div className="d-flex mb-3">
              <div className="avatar avatar-xs me-2">
                <span role="button">
                  
                  <img className="avatar-img rounded-circle" src={avatar12} alt="avatar12" />
                </span>
              </div>

              <form className="nav nav-item w-100 position-relative">
                <textarea data-autoresize className="form-control pe-5 bg-light" rows={1} placeholder="Add a comment..." defaultValue={''} />
                <button className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0" type="button">
                  <BsSendFill />
                </button>
              </form>
            </div>

            <ul className="comment-wrap list-unstyled">
              {comments.map(comment => <CommentItem {...comment} key={comment.id} />)}
            </ul>
          </>}
      </CardBody>

      <CardFooter className="border-0 pt-0">{comments && <LoadContentButton name="Load more comments" />}</CardFooter>
    </Card>;
};
export default PostCard;