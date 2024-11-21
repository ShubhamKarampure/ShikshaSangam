import { getAllGroups } from '@/helpers/data';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import { BsGlobe, BsLock } from 'react-icons/bs';
import { useFetchData } from '@/hooks/useFetchData';
const GroupCard = ({
  image,
  logo,
  memberCount,
  members,
  name,
  ppd,
  type
}) => {
  return <Card>
      <div className="h-80px rounded-top" style={{
      backgroundImage: `url(${image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }} />
      <CardBody className="text-center pt-0">
        <div className="avatar avatar-lg mt-n5 mb-3">
          <Link to="/group/details">
            <img className="avatar-img rounded-circle border border-white border-3 bg-mode" src={logo} alt="logo" />
          </Link>
        </div>

        <h5 className="mb-0">
          
          <Link to="/group/details">{name}</Link>
        </h5>
        <small>
          
          {type === 'Private' ? <BsLock size={17} className="pe-1" /> : <BsGlobe size={16} className="pe-1" />} {type} Group
        </small>

        <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
          <div>
            <h6 className="mb-0">{memberCount}</h6>
            <small>Members</small>
          </div>
          <div className="vr" />
          <div>
            <h6 className="mb-0">{ppd}</h6>
            <small>Post per day</small>
          </div>
        </div>

        <ul className="avatar-group list-unstyled align-items-center justify-content-center mb-0 mt-3">
          {members.map((avatar, idx) => <li className="avatar avatar-xs" key={idx}>
              <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
            </li>)}
          <li className="avatar avatar-xs">
            <div className="avatar-img rounded-circle bg-primary">
              <span className="smaller text-white position-absolute top-50 start-50 translate-middle">+{Math.floor(Math.random() * 30)}</span>
            </div>
          </li>
        </ul>
      </CardBody>
    </Card>;
};
const Groups = () => {
  const allGroups = useFetchData(getAllGroups);
  return <section className="pt-5 pb-5">
      <Container>
        <Row>
          <Col xs={12} className="mb-3">
            <h4>Explore Groups </h4>
          </Col>
        </Row>
        <Row className="g-4">
          {allGroups?.slice(0, 3).map((group, idx) => <Col md={4} key={idx}>
              <GroupCard {...group} />
            </Col>)}
        </Row>
      </Container>
    </section>;
};
export default Groups;