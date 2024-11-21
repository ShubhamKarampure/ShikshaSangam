import { Link } from 'react-router-dom';
import { BsChatLeftTextFill, BsGearFill } from 'react-icons/bs';
import LogoBox from '@/components/LogoBox';
import CollapseMenu from './CollapseMenu';
import MobileMenuToggle from './MobileMenuToggle';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import StyledHeader from './StyledHeader';
const TopHeader = () => {
  return <StyledHeader>
      <div className="container">
        <LogoBox />

        <MobileMenuToggle />

        <CollapseMenu isSearch />

        <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
          <li className="nav-item ms-2">
            <Link className="nav-link bg-light icon-md btn btn-light p-0" to="/messaging">
              <BsChatLeftTextFill size={15} />
            </Link>
          </li>

          <li className="nav-item ms-2">
            <Link className="nav-link bg-light icon-md btn btn-light p-0" to="/settings/account">
              <BsGearFill size={15} />
            </Link>
          </li>

          <NotificationDropdown />

          <ProfileDropdown />
        </ul>
      </div>
    </StyledHeader>;
};
export default TopHeader;