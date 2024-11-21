import LogoBox from '@/components/LogoBox';
import { Collapse, Container, Dropdown, DropdownMenu, DropdownToggle, FormControl, Nav, NavItem, NavLink } from 'react-bootstrap';
import { BsJustifyLeft, BsSearch } from 'react-icons/bs';
import { menuData } from '../data';
import ProfileDropdown from './ProfileDropdown';
import { useEffect } from 'react';
import useToggle from '@/hooks/useToggle';
const Topbar = () => {
  const {
    isTrue: isOpen,
    toggle
  } = useToggle();
  const {
    isTrue: isMenuOpen,
    toggle: toggleMenu
  } = useToggle();
  useEffect(() => {
    isOpen ? document.body.classList.add('sidebar-start-enabled') : document.body.classList.remove('sidebar-start-enabled');
    return () => {
      document.body.classList.remove('sidebar-start-enabled');
    };
  });
  return <>
      <header className="navbar-light bg-mode fixed-top">
        <nav className="navbar navbar-icon navbar-expand-lg">
          <Container fluid>
            <a className="btn text-secondary py-0 me-sm-3 sidebar-start-toggle" onClick={toggle}>
              <BsJustifyLeft className="fs-3 lh-1" />
            </a>
            <LogoBox />
            <button onClick={toggleMenu} className="navbar-toggler ms-auto icon-md btn btn-light p-0" type="button" data-bs-toggle="collapse" aria-controls="navbarCollapse" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
              <span className="navbar-toggler-animation">
                <span />
                <span />
                <span />
              </span>
            </button>
            <Collapse in={isMenuOpen} className="navbar-collapse">
              <div>
                <Nav defaultActiveKey="0" className="navbar-nav navbar-nav-scroll mx-auto">
                  {menuData.map(({
                  icon: Icon,
                  label,
                  isBadge
                }, idx) => <NavItem key={idx}>
                      <NavLink eventKey={`${idx}`}>
                        {isBadge && <div className="badge-notif badge-notif-bottom" />}
                        <Icon /> <span className="nav-text">{label}</span>
                      </NavLink>
                    </NavItem>)}
                </Nav>
              </div>
            </Collapse>
            <ul className="nav flex-nowrap align-items-center ms-auto list-unstyled">
              <Dropdown className="nav-item ms-2 nav-search">
                <DropdownToggle as="a" className="nav-link btn icon-md p-0" id="searchDropdown" role="button">
                  <BsSearch className="fs-5"> </BsSearch>
                </DropdownToggle>
                <DropdownMenu className="dropdown-animation dropdown-menu-end p-3 small" aria-labelledby="searchDropdown">
                  <div className="nav flex-nowrap align-items-center">
                    <NavItem className="w-100">
                      <form className="rounded position-relative">
                        <FormControl className="ps-5 bg-light" type="search" placeholder="Search..." aria-label="Search" />
                        <button className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y" type="submit">
                          <BsSearch className="fs-5"> </BsSearch>
                        </button>
                      </form>
                    </NavItem>
                  </div>
                </DropdownMenu>
              </Dropdown>
              <ProfileDropdown />
            </ul>
          </Container>
        </nav>
      </header>
    </>;
};
export default Topbar;