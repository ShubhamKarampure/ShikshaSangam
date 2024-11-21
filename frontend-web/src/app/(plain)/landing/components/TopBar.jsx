import LogoBox from '@/components/LogoBox';
import { useLayoutContext } from '@/context/useLayoutContext';
import { Link } from 'react-router-dom';
import { Collapse, Container } from 'react-bootstrap';
const TopBar = () => {
  const {
    mobileMenu
  } = useLayoutContext();
  return <header className="navbar-light header-static bg-transparent">
      <nav className="navbar navbar-expand-lg">
        <Container>
          <LogoBox />
          <button onClick={mobileMenu.toggle} className="navbar-toggler ms-auto icon-md btn btn-light p-0" type="button" data-bs-toggle="collapse" aria-expanded={mobileMenu.open} aria-label="Toggle navigation">
            <span className="navbar-toggler-animation">
              <span />
              <span />
              <span />
            </span>
          </button>
          <Collapse in={mobileMenu.open} className="navbar-collapse">
            <ul className="navbar-nav navbar-nav-scroll me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings/profile">
                  Security
                </Link>
              </li>
            </ul>
          </Collapse>
          <div className="ms-3 ms-lg-auto">
            <Link className="btn btn-dark" to="/download">
              
              Download app
            </Link>
          </div>
        </Container>
      </nav>
    </header>;
};
export default TopBar;