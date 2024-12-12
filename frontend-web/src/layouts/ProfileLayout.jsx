import { lazy, Suspense } from "react";
const TopHeader = lazy(() => import("@/components/layout/TopHeader"));
import GlightBox from "@/components/GlightBox";
import { useFetchData } from "@/hooks/useFetchData";
import clsx from "clsx";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "react-bootstrap";
import {
  BsBookmark,
  BsBriefcase,
  BsCalendar2Plus,
  BsCalendarDate,
  BsChatLeftText,
  BsEnvelope,
  BsFileEarmarkPdf,
  BsGear,
  BsGeoAlt,
  BsHeart,
  BsLock,
  BsPatchCheckFill,
  BsPencilFill,
  BsPersonX,
  BsThreeDots,
} from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { PROFILE_MENU_ITEMS } from "@/assets/data/menu-items";
import { getAllUsers } from "@/helpers/data";
import avatar7 from "@/assets/images/avatar/07.jpg";
import background5 from "@/assets/images/bg/05.jpg";
import album1 from "@/assets/images/albums/01.jpg";
import album2 from "@/assets/images/albums/02.jpg";
import album3 from "@/assets/images/albums/03.jpg";
import album4 from "@/assets/images/albums/04.jpg";
import album5 from "@/assets/images/albums/05.jpg";
import React, { useState, useEffect } from "react";
import { experienceData } from "@/assets/data/layout";
import { Link, useLocation } from "react-router-dom";
import FallbackLoading from "@/components/FallbackLoading";
import Preloader from "@/components/Preloader";
import { useAuthContext } from "@/context/useAuthContext";
import { useProfileContext } from "@/context/useProfileContext";
import { getUserProfile } from "@/api/profile";
import { useParams } from "react-router-dom";
import Loader from "@/components/layout/loadingAnimation";

const Experience = ({ experienceData }) => {
  return (
    <Card>
      <CardHeader className="d-flex justify-content-between border-0">
        <h5 className="card-title">Experience</h5>
        <Button variant="primary-soft" size="sm">
          <FaPlus />
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        {experienceData?.map((experience, idx) => (
          <div key={idx} className="mb-4">
            {/* Company Logo and Name */}
            <div className="d-flex align-items-start">
              <div className="avatar me-3">
                <img
                  className="avatar-img rounded-circle"
                  src={experience.logo}
                  alt={`${experience.company_name} logo`}
                />
              </div>
              <div>
                <h6 className="mb-1">{experience.company_name}</h6>
                <p className="small text-muted">{experience.duration}</p>
              </div>
            </div>

            {/* Designations */}
            <div className="mt-3">
              {experience?.designations?.map((designation, designationIdx) => (
                <div key={designationIdx} className="mb-3">
                  <h6 className="mb-0">{designation.designation}</h6>
                  <p className="small text-muted mb-1">
                    {designation.duration} | {designation.location}
                  </p>
                  <p className="small">{designation.projects}</p>
                  <Link className="btn btn-primary-soft btn-xs" to="">
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};


const Photos = () => {
  return (
    <Card>
      <CardHeader className="d-sm-flex justify-content-between border-0">
        <CardTitle>Photos</CardTitle>
        <Button variant="primary-soft" size="sm">
          See all photo
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        <Row className="g-2">
          <Col xs={6}>
            <GlightBox href={album1} data-gallery="image-popup">
              <img
                className="rounded img-fluid"
                src={album1}
                alt="album-image"
              />
            </GlightBox>
          </Col>
          <Col xs={6}>
            <GlightBox href={album2} data-gallery="image-popup">
              <img
                className="rounded img-fluid"
                src={album2}
                alt="album-image"
              />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album3} data-gallery="image-popup">
              <img
                className="rounded img-fluid"
                src={album3}
                alt="album-image"
              />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album4} data-gallery="image-popup">
              <img
                className="rounded img-fluid"
                src={album4}
                alt="album-image"
              />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album5} data-gallery="image-popup">
              <img
                className="rounded img-fluid"
                src={album5}
                alt="album-image"
              />
            </GlightBox>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};



const OnboardingProfileLayout = ({ name, avatar, banner }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);

  // Convert file to base64 when avatar and banner props are passed
  useEffect(() => {
    const processFile = (file, setUrl) => {
      if (file instanceof Blob) { // Check if it's a File or Blob
        const reader = new FileReader();
        reader.onloadend = () => {
          setUrl(reader.result); // Update state with base64 image data
        };
        reader.readAsDataURL(file);
      } else if (typeof file === "string") {
        setUrl(file); // If it's already a string (URL), set it directly
      } else {
        console.error("Invalid file type:", file);
      }
    };

    if (avatar) {
      processFile(avatar, setAvatarUrl);
    }
    if (banner) {
      processFile(banner, setBannerUrl);
    } 
  }, [avatar, banner]); // This will run whenever the avatar or banner prop changes

  return (
    <main>
      <Card className="mb-4">
        <div
          className="h-200px rounded-top"
          style={{
            backgroundImage: bannerUrl
              ? `url(${bannerUrl})`
              : `url(${background5})`, // Fallback to background5 if no banner URL
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <CardBody className="py-0">
          <div className="d-sm-flex align-items-start text-center text-sm-start">
            <div>
              <div className="avatar avatar-xxl mt-n5 mb-3">
                {avatarUrl ? (
                  <img
                    className="avatar-img rounded-circle border border-white border-3"
                    src={avatarUrl} // Use the base64 string if available
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="avatar-img rounded-circle border border-white border-3"
                    src={`https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`} // Default avatar
                    alt="avatar"
                  />
                )}
              </div>
            </div>
            <div className="ms-sm-4 mt-sm-3">
              <h1 className="mb-0 h5">
                {name ? name : "Sam Lanson"}{" "}
                <BsPatchCheckFill className="text-success small" />
              </h1>
            </div>
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

// Default props in case any prop is not passed
OnboardingProfileLayout.defaultProps = {
  banner: background5, // Fallback banner image
};

const ProfileLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAuthContext(); // Current logged-in user
  const { profile } = useProfileContext(); // Current user's profile
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const { userId } = useParams(); // Fetch userId from route params

  const [userProfile, setUserProfile] = useState(profile); // State to hold the user profile
  const [loading, setLoading] = useState(true); // State for loading status

  // Determine if the profile being viewed is the current user's or someone else's
  const isCurrentUser = !userId || userId === user.id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true); // Set loading to true when fetching starts
      if (!isCurrentUser) {
        try {
          const fetchedProfile = await getUserProfile(userId);
          console.log(fetchedProfile);
          setUserProfile(fetchedProfile); // Update state with the fetched profile
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(profile); // Use current user's profile
      }
      setLoading(false); // Set loading to false when fetching is complete
    };

    fetchUserProfile();
  }, [isCurrentUser, userId, profile]);

  const avatarUrl =
    userProfile?.avatar_image && cloudName
      ? `https://res.cloudinary.com/${cloudName}/${userProfile.avatar_image}`
      : `https://ui-avatars.com/api/?name=${userProfile?.full_name || "Unknown"}&background=0D8ABC&color=fff`;

  const bannerUrl =
    userProfile?.banner_image && cloudName
      ? `https://res.cloudinary.com/${cloudName}/${userProfile.banner_image}`
      : background5;

   const maxBioLength = 150; // Set a maximum length for the bio
const bio = user.role !== 'college_staff' && profile?.bio ? 
           (profile.bio.length > maxBioLength ? profile.bio.substring(0, maxBioLength) : profile.bio) : 
           'Here to connect, learn, and grow.';

  const full_name =
    userProfile?.full_name || userProfile?.username || "Unknown User";
  const specialization =
    userProfile?.specialization || userProfile?.role || "No specialization";
  const location = userProfile?.location || "";

  return (
    <>
      <Suspense fallback={<Preloader />}>
        <TopHeader />
      </Suspense>

      <main>
        {loading ? (
          <Loader /> // Show the preloader while the data is being fetched
        ) : (
          <Container>
            <Row className="g-4">
              <Col lg={8} className="vstack gap-4">
                <Card>
                  <div
                    className="h-200px rounded-top"
                    style={{
                      backgroundImage: `url(${bannerUrl})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <CardBody className="py-0">
                    <div className="d-sm-flex align-items-start text-center text-sm-start">
                      <div>
                        <div className="avatar avatar-xxl mt-n5 mb-3">
                          <img
                            className="avatar-img rounded-circle border border-white border-3"
                            src={avatarUrl}
                            alt="avatar"
                          />
                        </div>
                      </div>
                      <div className="ms-sm-4 mt-sm-3">
                        <h1 className="mb-0 h5">
                          {full_name}{" "}
                          <BsPatchCheckFill className="text-success small" />
                        </h1>
                        <p>250 connections</p>
                      </div>
                      <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                        {isCurrentUser && (
                          <div className="d-flex justify-content-center mt-3">
                            <Button
                              variant="danger-soft"
                              className="me-2"
                              type="button"
                            >
                              <BsPencilFill size={19} className="pe-1" /> Edit
                              profile
                            </Button>
                          </div>
                        )}
                          {isCurrentUser && (<Dropdown>
                            <DropdownToggle
                              as="a"
                              className="icon-md btn btn-light content-none"
                              type="button"
                              id="profileAction2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span>
                                <BsThreeDots />
                              </span>
                            </DropdownToggle>
                            <DropdownMenu
                              className="dropdown-menu-end"
                              aria-labelledby="profileAction2"
                            >
                              <li>
                                <DropdownItem>
                                  <BsBookmark size={22} className="fa-fw pe-2" />
                                  Share profile in a message
                                </DropdownItem>
                              </li>
                              <li>
                                <DropdownItem>
                                  <BsFileEarmarkPdf
                                    size={22}
                                    className="fa-fw pe-2"
                                  />
                                  Save your profile to PDF
                                </DropdownItem>
                              </li>
                              <li>
                                <DropdownItem>
                                  <BsLock size={22} className="fa-fw pe-2" />
                                  Lock profile
                                </DropdownItem>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <DropdownItem>
                                  <BsGear size={22} className="fa-fw pe-2" />
                                  Profile settings
                                </DropdownItem>
                              </li>
                            </DropdownMenu>
                          </Dropdown>)}
                      </div>
                    </div>
                    <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                      <li className="list-inline-item">
                        <BsBriefcase className="me-1" /> {user.role}
                      </li>
                      <li className="list-inline-item">
                        <BsGeoAlt className="me-1" />
                        {location}
                      </li>
                      <li className="list-inline-item">
                        <BsCalendar2Plus className="me-1" /> Joined on Nov 26,
                        2019
                      </li>
                    </ul>
                  </CardBody>
                  <CardFooter className="card-footer mt-3 pt-2 pb-0">
                    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                      {PROFILE_MENU_ITEMS.map((item, idx) => (
                        <li className="nav-item" key={idx}>
                          <Link
                            className={clsx("nav-link", {
                              active: pathname === item.url,
                            })}
                            to={item.url ?? ""}
                          >
                            {item.label}{" "}
                            {item.badge && (
                              <span className="badge bg-success bg-opacity-10 text-success small">
                                {" "}
                                {item.badge.text}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardFooter>
                </Card>
                <Suspense fallback={<FallbackLoading />}> {children}</Suspense>
              </Col>
              <Col lg={4}>
                <Row className="g-4">
                  <Col md={6} lg={12}>
                    <Card>
                      <CardHeader className="border-0 pb-0">
                        <CardTitle>About</CardTitle>
                      </CardHeader>
                      <CardBody className="position-relative pt-0">
                        <p>{bio}</p>
                        <ul className="list-unstyled mt-3 mb-0">
                          
                          <li>
                            <BsEnvelope size={18} className="fa-fw pe-1" />{" "}
                            Email: <strong> {user.email} </strong>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={6} lg={12}>
                    <Experience experienceData={userProfile?.experience || []} />
                  </Col>
                  
                 
                </Row>
              </Col>
            </Row>
          </Container>
        )}
      </main>
    </>
  );
};
export { ProfileLayout, OnboardingProfileLayout };
