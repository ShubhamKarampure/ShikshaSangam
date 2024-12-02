import { Button, Card, CardBody, CardFooter, CardHeader,} from 'react-bootstrap';
import { BsInfoCircle, } from 'react-icons/bs';
import logo12 from '@/assets/images/logo/12.svg';
import postImg2 from '@/assets/images/post/3by2/02.jpg';
import { Link } from 'react-router-dom';
import ActionMenu from './ActionMenu.jsx';

const SponsoredCard = () => {
    return <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-2">
                <span role="button">
                  
                  <img className="avatar-img rounded-circle" src={logo12} alt="image" />
                </span>
              </div>
  
              <div>
                <h6 className="card-title mb-0">
                  <Link to=""> Bootstrap: Front-end framework </Link>
                </h6>
                <Link to="" className="mb-0 text-body">
                  Sponsored
                  <BsInfoCircle className="ps-1" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="You're seeing this ad because your activity meets the intended audience of our site." />
                </Link>
              </div>
            </div>
            <ActionMenu />
          </div>
        </CardHeader>
  
        <CardBody>
          <p className="mb-0">Quickly design and customize responsive mobile-first sites with Bootstrap.</p>
        </CardBody>
        <img src={postImg2} alt="post-image" />
  
        <CardFooter className="border-0 d-flex justify-content-between align-items-center">
          <p className="mb-0">Currently v5.1.3 </p>
          <Button variant="primary-soft" size="sm">
            
            Download now
          </Button>
        </CardFooter>
      </Card>;
  };

export default SponsoredCard