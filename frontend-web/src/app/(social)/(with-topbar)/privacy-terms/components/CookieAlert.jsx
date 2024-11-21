import { Alert, Button } from 'react-bootstrap';
import cookieImg from '@/assets/images/cookie.svg';
import useToggle from '@/hooks/useToggle';
import { Link } from 'react-router-dom';
const CookieAlert = () => {
  const {
    isTrue: isOpen,
    toggle
  } = useToggle(true);
  return <Alert show={isOpen} variant="light" className="alert-light fade show position-fixed start-0 bottom-0 z-index-99 shadow p-4 m-3 col-10 col-md-4 col-lg-3" role="alert">
      <div className="text-dark">
        <img src={cookieImg} width={62} height={50} className="h-50px mb-3" alt="cookie" />
        <p className="mb-0">
          This website stores cookies on your computer. To find out more about the cookies we use, see our
          <Link className="text-dark" to="">
            <u> Privacy Policy</u>
          </Link>
        </p>
        <div className="mt-3">
          <Button variant="success-soft" size="sm" className="mb-0 me-1" onClick={toggle}>
            <span aria-hidden="true">Accept</span>
          </Button>
          <Button variant="danger-soft" size="sm" className="mb-0" onClick={toggle}>
            <span aria-hidden="true">Decline</span>
          </Button>
        </div>
      </div>
    </Alert>;
};
export default CookieAlert;