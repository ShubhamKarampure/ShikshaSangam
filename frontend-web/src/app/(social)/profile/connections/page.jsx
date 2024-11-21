import { getAllUserConnections } from '@/helpers/data';
import clsx from 'clsx';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import LoadMoreButton from './components/LoadMoreButton';
import { Link } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import { useFetchData } from '@/hooks/useFetchData';
const Connections = () => {
  const allConnections = useFetchData(getAllUserConnections);
  return <>
    <PageMetaData title='Connections' />
    <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle> Connections</CardTitle>
      </CardHeader>
      <CardBody>
        {allConnections?.map((connection, idx) => <div className="d-md-flex align-items-center mb-4" key={idx}>
            <div className="avatar me-3 mb-3 mb-md-0">
              {connection.user?.avatar && <span role="button">
                  
                  <img className="avatar-img rounded-circle" src={connection.user.avatar} alt="" />
                </span>}
            </div>
            <div className="w-100">
              <div className="d-sm-flex align-items-start">
                <h6 className="mb-0">
                  <Link to="">{connection.user?.name}</Link>
                </h6>
                <p className="small ms-sm-2 mb-0">{connection.role}</p>
              </div>
              <ul className="avatar-group mt-1 list-unstyled align-items-sm-center">
                {connection?.sharedConnectionAvatars && <>
                    {connection.sharedConnectionAvatars.map((avatar, idx) => <li className="avatar avatar-xxs" key={idx}>
                        <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
                      </li>)}
                    <li className="avatar avatar-xxs">
                      <div className="avatar-img rounded-circle bg-primary">
                        <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                          +{Math.floor(Math.random() * 10)}
                        </span>
                      </div>
                    </li>
                  </>}
                <li className={clsx('small', {
                'ms-3': connection.sharedConnectionAvatars
              })}>{connection.description}</li>
              </ul>
            </div>
            <div className="ms-md-auto d-flex">
              <Button variant="danger-soft" size="sm" className="mb-0 me-2">
                
                Remove
              </Button>
              <Button variant="primary-soft" size="sm" className="mb-0">
                
                Message
              </Button>
            </div>
          </div>)}
        <div className="d-grid">
          <LoadMoreButton />
        </div>
      </CardBody>
    </Card>
    </>;
};
export default Connections;