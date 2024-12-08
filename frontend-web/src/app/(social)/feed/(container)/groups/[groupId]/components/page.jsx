import React from "react";
import {
  Button,
  Card,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";
import {
  BsPatchCheckFill,
  BsPersonCheckFill,
  BsChatFill,
} from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import avatar1 from "@/assets/images/avatar/01.jpg";
import avatar2 from "@/assets/images/avatar/02.jpg";
import avatar3 from "@/assets/images/avatar/03.jpg";
import avatar4 from "@/assets/images/avatar/04.jpg";
import avatar5 from "@/assets/images/avatar/05.jpg";
import logo13 from "@/assets/images/logo/13.svg";
import bgBannerImg from "@/assets/images/bg/01.jpg";
import "./Discussion";
import Discussion from "./Discussion";
import Material from "./Material";
import Quiz from "./Quiz";
import About from "./About";
import Room from "./Room";
import ChatArea from "./Chat";
const AllGroupDetails = () => {
  const members = [avatar1, avatar2, avatar3, avatar4, avatar5];

  return (
    <TabContainer defaultActiveKey="group-tab-1">
      <Card className="position-relative overflow-hidden">
        {/* Background with reduced opacity */}
        <div
          className="position-absolute w-100 h-200px"
          style={{
            backgroundImage: `url(${bgBannerImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: 0.5,
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div className="position-relative z-1 p-4">
          <div className="d-md-flex flex-wrap align-items-start text-center text-md-start">
            <div className="mb-2">
              <div className="avatar avatar-xl">
                <img
                  className="avatar-img border-0"
                  src="https://images.seeklogo.com/logo-png/27/2/react-logo-png_seeklogo-273845.png?v=638687123030000000"
                  alt="logo"
                />
              </div>
            </div>
            <div className="ms-md-4 mt-3">
              <h1 className="h5 mb-0">
                React Forum <BsPatchCheckFill className="text-success small" />
              </h1>
              <ul className="nav nav-divider text-white justify-content-center justify-content-md-start">
                <li className="nav-item">Private group</li>
                <li className="nav-item">28.3K members</li>
              </ul>
            </div>
          </div>
          <ul className="avatar-group list-unstyled justify-content-center justify-content-md-start align-items-center mb-0 mt-3 flex-wrap">
            {members.map((member, idx) => (
              <li className="avatar avatar-xs" key={idx}>
                <img
                  className="avatar-img rounded-circle"
                  src={member}
                  alt="avatar"
                />
              </li>
            ))}
            <li className="avatar avatar-xs me-2">
              <div className="avatar-img rounded-circle bg-primary">
                <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                  +19
                </span>
              </div>
            </li>
            <li className="small text-center">
              Carolyn Ortiz, Frances Guerrero, and 20 joined group
            </li>
          </ul>

          <div className="d-flex justify-content-center justify-content-md-start align-items-center mt-3 ms-lg-auto">
            <Button
              style={{
                backgroundColor: "#007bff", // Primary color
                border: "none", // Remove border
                color: "#fff", // Text color
                opacity: 1, // Ensure full opacity
              }}
              size="sm"
              className="me-2"
              type="button"
            >
              <BsPersonCheckFill size={16} className="pe-1" /> Joined
            </Button>

            <Button variant="success" size="sm" className="me-2" type="button">
              <FaPlus className="pe-1" /> Invite
            </Button>
          </div>
        </div>

        <CardFooter className="pb-0">
          <Nav className="nav-tabs nav-bottom-line justify-content-center justify-content-md-start mb-0">
            <NavItem>
              <NavLink eventKey="group-tab-3">Discussion</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="group-tab-4">Material</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="group-tab-5">Quiz</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="group-tab-6">Chat</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="group-tab-7">Rooms</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="group-tab-2">About</NavLink>
            </NavItem>
          </Nav>
        </CardFooter>
      </Card>

      <TabContent>
        <TabPane eventKey="group-tab-2"><About/></TabPane>
        <TabPane eventKey="group-tab-3"><Discussion /></TabPane>
        <TabPane eventKey="group-tab-4"><Material/></TabPane>
        <TabPane eventKey="group-tab-5"><Quiz /></TabPane>
        <TabPane eventKey="group-tab-7"><Room /></TabPane>
         <TabPane eventKey="group-tab-6"><ChatArea /></TabPane>
        
      </TabContent>
    </TabContainer>
  );
};

export default AllGroupDetails;
