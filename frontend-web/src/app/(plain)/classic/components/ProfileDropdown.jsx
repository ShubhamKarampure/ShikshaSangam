import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { developedByLink } from '@/context/constants';
import { useLayoutContext } from '@/context/useLayoutContext';
import { toSentenceCase } from '@/utils/change-casing';
import clsx from 'clsx';
import { BsCardText, BsCircleHalf, BsGear, BsLifePreserver, BsMoonStars, BsPower, BsSun } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import avatar7 from '@/assets/images/avatar/07.jpg';
import { useAuthContext } from '@/context/useAuthContext';
import { useAuthContext } from '@/context/useAuthContext'
import { useProfileContext } from "@/context/useProfileContext";


const ProfileDropdown = () => {
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

 const avatarUrl = user.role !== 'college_staff' && profile && profile.avatar_image && cloudName
  ? `https://res.cloudinary.com/${cloudName}/${profile.avatar_image}`
    : `https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`;

 

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
        <img className="avatar-img rounded-2" src={avatarUrl} alt="avatar" />
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
          <Link className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center" to="/profile/feed">
            View profile
          </Link>
        </li>

        <li>
          <Link className="dropdown-item" to="/settings/account">
            <BsGear className="fa-fw me-2" />
            Settings &amp; Privacy
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to={developedByLink} rel="noreferrer" target="_blank">
            <BsLifePreserver className="fa-fw me-2" />
            Support
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="" target="_blank" rel="noreferrer">
            <BsCardText className="fa-fw me-2" />
            Documentation
          </Link>
        </li>
        <li className="dropdown-divider" />
        <li>
          <DropdownItem className="dropdown-item bg-danger-soft-hover" onClick={removeSession}>
            <BsPower className="fa-fw me-2" />
            Sign Out
          </DropdownItem>
        </li>
        <li>

          <hr className="dropdown-divider" />
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