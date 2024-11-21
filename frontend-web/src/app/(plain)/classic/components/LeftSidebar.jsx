import { Link } from 'react-router-dom';
import { leftSidebarData } from '../data';
const LeftSidebar = () => {
  return <div className="nav-sidenav p-4 bg-mode h-100 custom-scrollbar">
      <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
        {leftSidebarData.map(({
        icon: Icon,
        label,
        url
      }, idx) => <li className="nav-item" key={idx}>
            <Link className="nav-link" to={url ?? ''}>
              <span className="nav-icon">
                
                <Icon />
              </span>
              <span className="nav-text">{label} </span>
            </Link>
          </li>)}
      </ul>
    </div>;
};
export default LeftSidebar;