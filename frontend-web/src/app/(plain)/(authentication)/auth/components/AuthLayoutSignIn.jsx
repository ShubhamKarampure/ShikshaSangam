import { Col, Container, Row } from 'react-bootstrap';
const AuthLayoutSignIn = ({
  children
}) => {
  return <main>
      <Container>
        <Row className="justify-content-center align-items-center pt-5">
          <Col sm={10} md={8} lg={7} xl={6} xxl={5}>
            {children}
          </Col>
        </Row>
      </Container>
    </main>;
};
export default AuthLayoutSignIn;