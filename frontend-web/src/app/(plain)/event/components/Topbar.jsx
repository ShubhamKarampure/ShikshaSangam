import CollapseMenu from '@/components/layout/TopHeader/CollapseMenu';
import MobileMenuToggle from '@/components/layout/TopHeader/MobileMenuToggle';
import ProfileDropdown from '@/components/layout/TopHeader/ProfileDropdown';
import StyledHeader from '@/components/layout/TopHeader/StyledHeader';
import LogoBox from '@/components/LogoBox';
const Topbar = () => {
  return <StyledHeader>
      <div className="container">
        <LogoBox />

        <MobileMenuToggle />

        <CollapseMenu />

        <ProfileDropdown />
      </div>
    </StyledHeader>;
};
export default Topbar;