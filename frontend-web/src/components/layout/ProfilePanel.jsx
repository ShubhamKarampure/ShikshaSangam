import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Card, CardBody, CardFooter } from 'react-bootstrap';
import avatar7 from '@/assets/images/avatar/07.jpg';
import bgBannerImg from '@/assets/images/bg/01.jpg';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/context/useAuthContext'
import { useProfileContext } from "@/context/useProfileContext";
import { fetchFollowersSummary } from "@/api/feed";
import { useState,useEffect } from 'react';

const ProfilePanel = ({
  links
}) => {
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [followData,setFollowData] = useState({});  
  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        const data = await fetchFollowersSummary();
        setFollowData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    fetchFollowData();
  }, []); // Empty dependency array ensures it runs once on mount

  
 const avatarUrl = user.role !== 'college_staff' && profile && profile.avatar_image && cloudName
  ? `https://res.cloudinary.com/${cloudName}/${profile.avatar_image}`
    : `https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`;

  const bannerUrl = user.role !== 'college_staff' && profile && profile.banner_image && cloudName
    ? `https://res.cloudinary.com/${cloudName}/${profile.banner_image}`
    : bgBannerImg
  
   const full_name = profile && profile.full_name ?
     profile.full_name : user.username
  
  const maxBioLength = 150; // Set a maximum length for the bio
const bio = user.role !== 'college_staff' && profile?.bio ? 
           (profile.bio.length > maxBioLength ? profile.bio.substring(0, maxBioLength) : profile.bio) : 
           'Here to connect, learn, and grow.';

    return <>
      <Card className="overflow-hidden h-100">
        <div className="h-50px" style={{
        backgroundImage: `url(${bannerUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} />

        <CardBody className="pt-0">
          <div className="text-center">
            <div className="avatar avatar-lg mt-n5 mb-3">
              <span role="button">
                {user.role !== 'college_admin' && (
                  <img
                    height={64}
                    width={64}
                    src={avatarUrl}
                    alt="avatar"
                    className="avatar-img rounded border border-white border-3"
                  />
                )}
              </span>
            </div>

            <h5 className="mb-0">
              
              <Link to="/profile/feed">{full_name} </Link>
            </h5>
            <small>{user.role}</small>
            <p className="mt-3">{bio}</p>

            <div className="hstack gap-2 gap-xl-3 justify-content-center">
              <div>
                <h6 className="mb-0">{followData.post}</h6>
                <small>Post</small>
              </div>
              <div className="vr" />
              <div>
                <h6 className="mb-0">{followData.followers_count}</h6>
                <small>Followers</small>
              </div>
              <div className="vr" />
              <div>
                <h6 className="mb-0">{followData.following_count}</h6>
                <small>Following</small>
              </div>
            </div>
          </div>

          <hr />

          <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
            {links.map((item, idx) => <li key={item.name + idx} className="nav-item">
                <Link className="nav-link" to={item.link}>
                  <img src={item.image} alt="icon" height={20} width={20} className="me-2 h-20px fa-fw" />
                  <span>{item.name} </span>
                </Link>
              </li>)}
          </ul>
        </CardBody>

        <CardFooter className="text-center py-2">
          <Link className="btn btn-sm btn-link" to="/profile/feed">
            View Profile
          </Link>
        </CardFooter>
      </Card>
      <ul className="nav small mt-4 justify-content-center lh-1">
        <li className="nav-item">
          <Link className="nav-link" to="/profile/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings/account">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" target="_blank" rel="noreferrer" to={developedByLink}>
            Support
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" target="_blank" rel="noreferrer" to="">
            Docs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/help">
            Help
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/privacy-terms">
            Privacy &amp; terms
          </Link>
        </li>
      </ul>

      <p className="small text-center mt-1">
        ©{currentYear}
        <a className="text-reset" target="_blank" rel="noreferrer" href={developedByLink}>
          
          {developedBy}
        </a>
      </p>
    </>;
};
export default ProfilePanel;