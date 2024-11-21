import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsCardText, BsCircleHalf, BsGear, BsLifePreserver, BsMoonStars, BsPower, BsSun } from 'react-icons/bs';
import avatar7 from '@/assets/images/avatar/07.jpg';
import { developedByLink } from '@/context/constants';
import { useAuthContext } from '@/context/useAuthContext';
import { useLayoutContext } from '@/context/useLayoutContext';
import { toSentenceCase } from '@/utils/change-casing';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
const ProfileDropdown = () => {
  const themeModes = [{
    icon: BsSun,
    theme: 'light'
  }, {
    icon: BsMoonStars,
    theme: 'dark'
  }, {
    icon: BsCircleHalf,
    theme: 'auto'
  }];
  const {
    theme: themeMode,
    updateTheme
  } = useLayoutContext();
  const {
    removeSession
  } = useAuthContext();
  return <Dropdown as="li" className="nav-item ms-2" drop="down" align="end">
      <DropdownToggle className="nav-link btn icon-md p-0 content-none" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
        <img className="avatar-img rounded-2" src={avatar7} alt="avatar" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-animation dropdown-menu-end pt-3 small me-md-n3" aria-labelledby="profileDropdown">
        <li className="px-3">
          <div className="d-flex align-items-center position-relative">
            <div className="avatar me-3">
              <img className="avatar-img rounded-circle" src={avatar7} alt="avatar" />
            </div>
            <div>
              <Link className="h6 stretched-link" to="">
                Lori Ferguson
              </Link>
              <p className="small m-0">Web Developer</p>
            </div>
          </div>
          <DropdownItem as={Link} className="btn btn-primary-soft btn-sm my-2 text-center" to="/profile/feed">
            View profile
          </DropdownItem>
        </li>

        <li>
          <DropdownItem as={Link} to="/settings/account">
            <BsGear className="fa-fw me-2" />
            Settings &amp; Privacy
          </DropdownItem>
        </li>
        <li>
          <DropdownItem href={developedByLink} rel="noreferrer" target="_blank">
            <BsLifePreserver className="fa-fw me-2" />
            Support
          </DropdownItem>
        </li>
        <li>
          <DropdownItem href="" target="_blank" rel="noreferrer">
            <BsCardText className="fa-fw me-2" />
            Documentation
          </DropdownItem>
        </li>
        <DropdownDivider />
        <li>
          <DropdownItem className="bg-danger-soft-hover" onClick={removeSession}>
            <BsPower className="fa-fw me-2" />
            Sign Out
          </DropdownItem>
        </li>
        <li>
          
          <DropdownDivider />
        </li>

        <li>
          <div className="modeswitch-item theme-icon-active d-flex justify-content-center gap-3 align-items-center p-2 pb-0">
            <span>Mode:</span>

            {themeModes.map(({
            icon: Icon,
            theme
          }, idx) => <OverlayTrigger key={theme + idx} overlay={<Tooltip>{toSentenceCase(theme)}</Tooltip>}>
                <button type="button" className={clsx('btn btn-modeswitch nav-link text-primary-hover mb-0', {
              active: theme === themeMode
            })} onClick={() => updateTheme(theme)}>
                  <Icon />
                </button>
              </OverlayTrigger>)}
          </div>
        </li>
      </DropdownMenu>
    </Dropdown>;
};
export default ProfileDropdown;