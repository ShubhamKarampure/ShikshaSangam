import { Col } from 'react-bootstrap';
import CreatePageForm from './components/CreatePageForm';
const CreatePage = () => {
  return <Col md={8} lg={6} className="vstack gap-4">
      <CreatePageForm />
    </Col>;
};
export default CreatePage;