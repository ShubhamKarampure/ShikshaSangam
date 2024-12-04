import { lazy, Suspense } from "react";
const TopHeader = lazy(() => import("@/components/layout/TopHeader"));
import { profilePanelLinksData1 } from "@/assets/data/layout";
import Messaging from "@/components/layout/Messaging";
import ProfilePanel from "@/components/layout/ProfilePanel";
import { useLayoutContext } from "@/context/useLayoutContext";
import useViewPort from "@/hooks/useViewPort";
import {
  Col,
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormControl,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
  Row,
} from "react-bootstrap";
import {
  BsBell,
  BsChatLeftTextFill,
  BsCheckSquare,
  BsGear,
  BsPencilSquare,
  BsPeople,
  BsSearch,
  BsSlashCircle,
  BsThreeDots,
  BsVolumeUpFill,
} from "react-icons/bs";
import { FaSlidersH } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import FallbackLoading from "@/components/FallbackLoading";
import Preloader from "@/components/Preloader";
const FeedLayout = ({ children }) => {
  const { messagingOffcanvas, startOffcanvas } = useLayoutContext();
  const { width } = useViewPort();
  return (
    <div style={{ width: "100%" , padding: '0px 65px'}}>
      <Suspense fallback={<Preloader />}>
        <TopHeader />
      </Suspense>
      <main style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <Row className="g-4">
            <Col lg={3}>
              <div className="d-flex align-items-center d-lg-none">
                <button
                  onClick={startOffcanvas.toggle}
                  className="border-0 bg-transparent"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSideNavbar"
                  aria-controls="offcanvasSideNavbar"
                >
                  <span className="btn btn-primary">
                    <FaSlidersH />
                  </span>
                  <span className="h6 mb-0 fw-bold d-lg-none ms-2">
                    My profile
                  </span>
                </button>
              </div>

              <nav className="navbar navbar-expand-lg mx-0">
                {width >= 992 ? (
                  <div className="d-block px-2 px-lg-0">
                    <ProfilePanel links={profilePanelLinksData1} />
                  </div>
                ) : (
                  <Offcanvas
                    show={startOffcanvas.open}
                    placement="start"
                    onHide={startOffcanvas.toggle}
                    tabIndex={-1}
                    id="offcanvasSideNavbar"
                  >
                    <OffcanvasHeader closeButton />

                    <OffcanvasBody className="d-block px-2 px-lg-0">
                      <div>
                        <ProfilePanel links={profilePanelLinksData1} />
                      </div>
                    </OffcanvasBody>
                  </Offcanvas>
                )}
              </nav>
            </Col>
            <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
          </Row>
        </div>
      </main>
      <div className="d-none d-lg-block">
        <a
          onClick={messagingOffcanvas.toggle}
          className="icon-md btn btn-primary position-fixed end-0 bottom-0 me-5 mb-5"
          role="button"
          aria-controls="offcanvasChat"
        >
          <span>
            <BsChatLeftTextFill />
          </span>
        </a>
        <Offcanvas
          show={messagingOffcanvas.open}
          onHide={messagingOffcanvas.toggle}
          placement="end"
          className="offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex={-1}
          id="offcanvasChat"
        >
          <OffcanvasHeader className="d-flex justify-content-between">
            <OffcanvasTitle as="h5">Messaging</OffcanvasTitle>
            <div className="d-flex">
              <a
                role="button"
                className="btn btn-secondary-soft-hover py-1 px-2"
              >
                <BsPencilSquare />
              </a>
              <Dropdown>
                <DropdownToggle
                  as="a"
                  className="content-none btn btn-secondary-soft-hover py-1 px-2"
                  id="chatAction"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsThreeDots />
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-end"
                  aria-labelledby="chatAction"
                >
                  <li>
                    <DropdownItem>
                      <BsCheckSquare className="fa-fw pe-2" size={23} /> Mark
                      all as read
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsGear className="fa-fw pe-2" size={23} /> Chat setting
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsBell className="fa-fw pe-2" size={23} /> Disable
                      notifications
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsVolumeUpFill className="fa-fw pe-2" size={23} />{" "}
                      Message sounds
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsSlashCircle className="fa-fw pe-2" size={23} /> Block
                      setting
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownDivider />
                  </li>
                  <li>
                    <DropdownItem>
                      <BsPeople className="fa-fw pe-2" size={23} /> Create a
                      group chat
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </Dropdown>
              <a
                role="button"
                className="btn btn-secondary-soft-hover py-1 px-2"
                onClick={messagingOffcanvas.toggle}
              >
                <FaXmark />
              </a>
            </div>
          </OffcanvasHeader>
          <div className="offcanvas-body pt-0 custom-scrollbar">
            <form className="rounded position-relative">
              <FormControl
                className="ps-5 bg-light"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button
                className="btn bg-transparent px-3 py-0 position-absolute top-50 start-0 translate-middle-y"
                type="button"
              >
                <BsSearch className="fs-5" />
              </button>
            </form>
            <Messaging />
          </div>
        </Offcanvas>
      </div>
    </div>
  );
};
export default FeedLayout;
