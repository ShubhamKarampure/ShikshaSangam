import LoadContentButton from '@/components/LoadContentButton';
import { getAllUsers } from '@/helpers/data';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Col } from 'react-bootstrap';
import { BsPersonCheckFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useFetchData } from '@/hooks/useFetchData';
const RecentPost = () => {
  return <Card>
      <CardHeader className="pb-0 border-0">
        <CardTitle className="mb-0">Recent post</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="mb-3">
          <h6 className="mb-0">
            <Link to="/blogs/51">Ten questions you should answer truthfully</Link>
          </h6>
          <small>2hr</small>
        </div>
        <div className="mb-3">
          <h6 className="mb-0">
            <Link to="/blogs/52">Five unbelievable facts about money</Link>
          </h6>
          <small>3hr</small>
        </div>
        <div className="mb-3">
          <h6 className="mb-0">
            <Link to="/blogs/53">Best Pinterest Boards for learning about business</Link>
          </h6>
          <small>4hr</small>
        </div>
        <div className="mb-3">
          <h6 className="mb-0">
            <Link to="/blogs/54">Skills that you can learn from business</Link>
          </h6>
          <small>6hr</small>
        </div>
        <LoadContentButton name="View all latest news" />
      </CardBody>
    </Card>;
};
const Tags = () => {
  const tags = ['blog', 'business', 'theme', 'social', 'getbootstrap', 'design', 'news', 'magazine', 'events'];
  return <Card>
      <CardHeader className="pb-0 border-0">
        <CardTitle className="mb-0">Tags</CardTitle>
      </CardHeader>
      <CardBody>
        <ul className="list-inline mb-0 d-flex flex-wrap gap-2">
          {tags.map((tag, idx) => <li className="list-inline-item m-0" key={idx}>
              <Button variant="outline-light" size="sm">
                {tag}
              </Button>
            </li>)}
        </ul>
      </CardBody>
    </Card>;
};
const Followers = () => {
  const allFollowers = useFetchData(getAllUsers);
  return <Card>
      <CardHeader className="pb-0 border-0">
        <CardTitle className="mb-0">Who to follow</CardTitle>
      </CardHeader>
      <CardBody>
        {allFollowers?.slice(0, 3).map((follower, idx) => <div className={clsx('hstack gap-2', {
        'mb-3': allFollowers.slice(0, 3).length - 1 != idx
      })} key={idx}>
            <div className={clsx('avatar', {
          'avatar-story': follower.isStory
        })}>
              <span role="button">
                <img className="avatar-img rounded-circle" src={follower.avatar} alt="image" />
              </span>
            </div>

            <div className="overflow-hidden">
              <Link className="h6 mb-0" to="">
                {follower.name}
              </Link>
              <p className="mb-0 small text-truncate">{follower.role}</p>
            </div>

            <Button variant={follower.hasRequested ? 'primary' : 'primary-soft'} className="rounded-circle icon-md ms-auto flex-centered">
              <span>{follower.hasRequested ? <BsPersonCheckFill /> : <FaPlus size={12} />}</span>
            </Button>
          </div>)}
      </CardBody>
    </Card>;
};
const SidePenal = () => {
  return <>
      <Col sm={6} lg={12}>
        <RecentPost />
      </Col>
      <Col sm={6} lg={12}>
        <Tags />
      </Col>
      <Col sm={6} lg={12}>
        <Followers />
      </Col>
    </>;
};
export default SidePenal;