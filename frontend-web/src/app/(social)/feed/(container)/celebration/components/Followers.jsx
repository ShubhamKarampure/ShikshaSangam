import { getAllUsers } from '@/helpers/data';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { BsPersonCheckFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useFetchData } from '@/hooks/useFetchData';
import { fetchUsersToFollow } from '@/api/social';

const Followers = () => {
  const allFollowers = useFetchData(getAllUsers);
useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsersToFollow();
        setUsersToFollow(data);
      } catch (error) {
        console.error('Error fetching users to follow:', error);
      }
    };
    fetchData();
  }, []);
    
  return <Card>
      <CardHeader className="pb-0 border-0">
        <CardTitle className="mb-0">Who to follow</CardTitle>
      </CardHeader>

      <CardBody>
        {allFollowers?.slice(0, 5).map((follower, idx) => <div className="hstack gap-2 mb-3" key={idx}>
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

        <div className="d-grid mt-3">
          <Button variant="primary-soft" size="sm">
            View more
          </Button>
        </div>
      </CardBody>
    </Card>;
};
export default Followers;