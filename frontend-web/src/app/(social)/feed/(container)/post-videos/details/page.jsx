import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { BsBookmark, BsBookmarkCheck, BsChatFill, BsCodeSlash, BsEnvelope, BsEyeFill, BsFlag, BsHandThumbsUpFill, BsLink, BsLink45Deg, BsPatchCheckFill, BsPencilSquare, BsReplyFill, BsShare, BsSlashCircle, BsThreeDots, BsXCircle } from 'react-icons/bs';
import RelatedVideos from './components/RelatedVideos';
import UserComments from '@/components/UserComments';
import { getAllFeeds } from '@/helpers/data';
import avatar1 from '@/assets/images/avatar/01.jpg';
import PageMetaData from '@/components/PageMetaData';
import { useFetchData } from '@/hooks/useFetchData';
const PostVideoDetails = () => {
  const allComments = useFetchData(getAllFeeds);
  return <>
      <PageMetaData title='Post Video Details' />
      <Col md={8} lg={9} className="vstack gap-4">
        <Card>
          <CardBody>
            <iframe className="rounded w-100" height={450} src="https://www.youtube.com/embed/n_Cn8eFo7u8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            <div className="d-flex my-3">
              <div>
                <h1 className="h4"> What&apos;s it like to work at Google? </h1>
                <div className="d-flex">
                  <div className="avatar avatar-xxs me-2">
                    <img className="avatar-img rounded-circle" src={avatar1} alt="" />
                  </div>
                  <h6 className="mb-0">
                    
                    <Link to="">
                      
                      Frances Guerrero <BsPatchCheckFill className="text-success small" />
                    </Link>
                  </h6>
                </div>
              </div>
              <Dropdown className="ms-auto">
                <DropdownToggle as="a" className="text-secondary ms-2 cursor-pointer content-none" id="feedVideoActionEdit" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsThreeDots />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end" aria-labelledby="feedVideoActionEdit">
                  <li>
                    <DropdownItem>
                      <BsBookmark size={19} className="fa-fw pe-1" /> Save video
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsLink45Deg size={19} className="fa-fw pe-1" /> Copy link
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsXCircle size={19} className="fa-fw pe-1" /> Hide post
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsSlashCircle size={19} className="fa-fw pe-1" /> Block
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownDivider />
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsFlag size={19} className="fa-fw pe-1" /> Report post
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </div>
            <ul className="nav nav-stack small mt-4">
              <li className="nav-item">
                <Link className="nav-link active" to="">
                  
                  <BsHandThumbsUpFill size={18} className="pe-1" />
                  Liked (23K)
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  
                  <BsChatFill size={18} className="pe-1" />
                  Comments (10K)
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  
                  <BsEyeFill size={18} className="pe-1" />
                  458M Views
                </Link>
              </li>
              <li className="nav-item ms-sm-auto">
                <Dropdown>
                  <DropdownToggle as="a" className="text-secondary content-none cursor-pointer" id="feedvideoActionShare" data-bs-toggle="dropdown" aria-expanded="false">
                    <BsReplyFill className="fa-flip-horizontal pe-1" size={18} />
                    Share (3K)
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end" aria-labelledby="feedvideoActionShare">
                    <li>
                      <DropdownItem>
                        
                        <BsEnvelope size={20} className="fa-fw pe-1" /> Send via Direct Message
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsBookmarkCheck size={20} className="fa-fw pe-1" /> Bookmark
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsLink size={20} className="fa-fw pe-1" /> Copy link to post
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsShare size={20} className="fa-fw pe-1" /> Share post via …
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsCodeSlash size={20} className="fa-fw pe-1" /> Embed
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownDivider />
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsPencilSquare size={20} className="fa-fw pe-1" /> Share to News Feed
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
            <div className="d-flex my-3">
              <div className="avatar avatar-xs me-2">
                <img className="avatar-img rounded-circle" src={avatar1} alt="avatar" />
              </div>
              <form className="position-relative w-100">
                <textarea className="one form-control pe-4 bg-light" rows={1} placeholder="Add a comment..." defaultValue={''} />
              </form>
            </div>
            {allComments?.slice(0, 1).map((comment, idx) => <UserComments comment={comment} key={idx} />)}
          </CardBody>
        </Card>
        <RelatedVideos />
      </Col>
    </>;
};
export default PostVideoDetails;