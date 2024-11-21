import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'react-bootstrap';
import PageMetaData from '@/components/PageMetaData';
const AccountClose = () => {
  return <>
      <PageMetaData title='Close Account' />
      <Card>
        <CardHeader className="border-0 pb-0">
          <h5 className="card-title">Delete account</h5>
          <p className="mb-0">
            He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment
            alteration to.
          </p>
        </CardHeader>
        <CardBody>
          <h6>Before you go...</h6>
          <ul>
            <li>
              Take a backup of your data <Link to="">Here</Link>
            </li>
            <li>If you delete your account, you will lose your all data.</li>
          </ul>
          <div className="form-check form-check-md my-4">
            <input className="form-check-input" type="checkbox" id="deleteaccountCheck" />
            <label className="form-check-label" htmlFor="deleteaccountCheck">
              Yes, I&apos;d like to delete my account
            </label>
          </div>
          <Button variant="success-soft" size="sm" className="mb-2 mb-sm-0">
            Keep my account
          </Button>
          <Button variant="danger" size="sm" className="mb-0 ms-1">
            Delete my account
          </Button>
        </CardBody>
      </Card>
    </>;
};
export default AccountClose;