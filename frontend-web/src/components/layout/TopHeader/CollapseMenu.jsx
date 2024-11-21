import { Collapse } from 'react-bootstrap';
import AppMenu from './AppMenu';
import { useLayoutContext } from '@/context/useLayoutContext';
import { BsSearch } from 'react-icons/bs';
const CollapseMenu = ({
  isSearch
}) => {
  const {
    mobileMenu: {
      open
    }
  } = useLayoutContext();
  return <Collapse in={open} className="navbar-collapse">
      <div>
        {isSearch && <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
            <div className="nav-item w-100">
              <form className="rounded position-relative">
                <input className="form-control ps-5 bg-light" type="search" placeholder="Search..." aria-label="Search" />
                <button className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y" type="submit">
                  <BsSearch className="fs-5"> </BsSearch>
                </button>
              </form>
            </div>
          </div>}

        <AppMenu />
      </div>
    </Collapse>;
};
export default CollapseMenu;