

import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { BsGlobe, BsLock, BsPeople } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useProfileContext} from '@/context/useProfileContext'
import {useNotificationContext} from '@/context/useNotificationContext'

// Placeholder image import
import placeholderImg from '@/assets/images/avatar/placeholder.jpg';

// Import your API functions (adjust path as needed)
import { createGroup, getAllGroups ,GroupParticipate} from '../../../../../../api/group';

// Custom hook for toggling (replace with your existing implementation)
const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return { isTrue: isOpen, toggle };
};

const GroupCard = ({ group }) => {

  const getFullImageUrl = (partialUrl, cloudName = 'dhp4wuv2x') => {
    if (!partialUrl) return null;
    
    // If it's already a full URL, return as is
    if (partialUrl.startsWith('http://') || partialUrl.startsWith('https://')) {
      return partialUrl;
    }
    
    // Prepend Cloudinary base URL
    return `https://res.cloudinary.com/${cloudName}/${partialUrl}`;
  };
  const {profile}=useProfileContext()
  const [isJoined,setIsJoined]=useState(group.participants.includes(profile.id)|| false)
  const [memberNoState,setMemberNoState]=useState(group.participants.length)
  console.log(isJoined,group.id);
  const {showNotification}=useNotificationContext()
  // Ensure group is defined with default values
  const {
    name = 'Unnamed Group',
    visibility = 'public',
    num_participants = 0,
    random_top_participants = [],
    banner = null,
    avatar = null
  } = group || {};
  const handleJoin=async()=>{
    try {
      const response=await GroupParticipate(group.id)
      console.log(response);
      showNotification({
        message:"You have joined the group",
        severity:"success"
      })
      setMemberNoState(memberNoState+1)
      setIsJoined(true)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card>
      <div
        className="h-80px rounded-top"
        style={{
          backgroundImage: `url(${banner || ''})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="card-body text-center pt-0">
        <div className="avatar avatar-lg mt-n5 mb-3">
          <Link to={isJoined && `/feed/groups/details/${group?.id}`}>
            <img 
              className="avatar-img rounded-circle border border-white border-3 bg-white" 
              src={getFullImageUrl(avatar) || placeholderImg} 
              alt="group" 
            />
          </Link>
        </div>
        <h5 className="mb-0">
          <Link to={isJoined && `/feed/groups/details/${group?.id}`}>{name}</Link>
        </h5>
        <small className="icons-center gap-1">
          {visibility === 'private' ? <BsLock size={17} className="pe-1" /> : <BsGlobe size={18} className="pe-1" />}
          {visibility.charAt(0).toUpperCase() + visibility.slice(1)} Group
        </small>
        <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
          <div>
            <h6 className="mb-0">{memberNoState}</h6>
            <small>Members</small>
          </div>
          <div className="vr" />
          <div>
            <h6 className="mb-0">0</h6>
            <small>Posts per day</small>
          </div>
        </div>
        {/* <ul className="avatar-group list-unstyled align-items-center justify-content-center mb-0 mt-3">
          {random_top_participants.slice(0, 3).map((participant, idx) => (
            <li className="avatar avatar-xs" key={idx}>
              <img 
                className="avatar-img rounded-circle" 
                src={participant.avatar || placeholderImg} 
                alt={participant.username || 'avatar'} 
              />
            </li>
          ))}
          {num_participants > random_top_participants.length && (
            <li className="avatar avatar-xs">
              <div className="avatar-img rounded-circle bg-primary">
                <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                  +{num_participants - random_top_participants.length}
                </span>
              </div>
            </li>
          )}
        </ul> */}
      </div>
      <CardFooter className="text-center">
        <Button variant="success-soft" size="sm" disabled={isJoined} onClick={handleJoin}>
          {isJoined?"Joined group":"Join group"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const AllGroups = () => {
  const { isTrue: isOpen, toggle } = useToggle();
  const [allGroups, setAllGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Group creation state
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [audience, setAudience] = useState("public");
  const [description, setDescription] = useState("");

  // Fetch groups from the API
  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      const groups = await getAllGroups();
      setAllGroups(groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
      // Optionally set an error state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGroupImage(e.target.files[0]);
    }
  };

  const handleCreateGroup = async () => {
    // Basic validation
    if (!groupName || !description) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("description", description);
    formData.append("visibility", audience.toLowerCase());
    if (groupImage) formData.append("avatar", groupImage);

    try {
      await createGroup(formData);
      console.log("Group created successfully");
      toggle(); // Close modal
      fetchGroups(); // Refresh groups list
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group. Please try again.");
    }
  };

  const GroupNotFound = () => (
    <div className="my-sm-5 py-sm-5 text-center">
      <BsPeople className="display-1 text-body-secondary" />
      <h4 className="mt-2 mb-3 text-body">No groups found</h4>
      <Button variant="primary-soft" size="sm" onClick={toggle}>
        Create a Group
      </Button>
    </div>
  );

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a proper spinner
  }

  return (
    <>
      <CardBody>
        <Card>
          <CardHeader className="border-0 pb-0">
            <Row className="g-2">
              <Col lg={2}>
                <h1 className="h4 card-title mb-lg-0">Groups</h1>
              </Col>
              <Col sm={6} lg={3} className="ms-lg-auto">
                {/* Optional: Add filter UI */}
              </Col>
              <Col sm={6} lg={3}>
                <Button variant="primary-soft" className="ms-auto w-100" onClick={toggle}>
                  <FaPlus className="pe-1" /> Create Group
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <TabContainer defaultActiveKey="tab-1">
              <TabContent className="mb-0 pb-0">
                <TabPane eventKey="tab-1">
                  <Row className="g-4">
                    {allGroups.length > 0 ? (
                      allGroups.map((group) => (
                        <Col sm={6} lg={4} key={group.id}>
                          <GroupCard group={group} />
                        </Col>
                      ))
                    ) : (
                      <GroupNotFound />
                    )}
                  </Row>
                </TabPane>
              </TabContent>
            </TabContainer>
          </CardBody>
        </Card>
      </CardBody>

      {/* Modal for creating groups */}
      <Modal show={isOpen} onHide={toggle}>
        <ModalHeader closeButton>
          <h5>Create Group</h5>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <label className="form-label">Group Name</label>
              <input
                type="text"
                className="form-control"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Group description"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Visibility</label>
              <select
                className="form-control"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Group Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageUpload}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateGroup}>
            Create Group
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AllGroups; 