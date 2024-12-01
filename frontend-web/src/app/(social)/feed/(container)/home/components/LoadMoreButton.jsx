import useToggle from '@/hooks/useToggle';
import clsx from 'clsx';
import { Button } from 'react-bootstrap';

const LoadMoreButton = () => {
  const {
    isTrue: isLoadButton,
    toggle
  } = useToggle();
  return <Button onClick={toggle} variant="primary-soft" role="button" className={clsx('btn-loader', {
    active: isLoadButton
  })} data-bs-toggle="button" aria-pressed="true">
      <span className="load-text"> Load more </span>
      <div className="load-icon">
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Button>;
};
export default LoadMoreButton;