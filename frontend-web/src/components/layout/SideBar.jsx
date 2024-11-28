import React, { useState } from "react";
import { FiChevronDown, FiChevronsRight, FiHome } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdAssignment, MdOutlineMenuBook } from "react-icons/md";
import { FaBlog, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Example = () => {
  return (
    <div className="d-flex bg-light">
      <SideBar />
      <ExampleContent />
    </div>
  );
};

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav
      className={`d-flex flex-column border-end ${
        open ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
      style={{
        backgroundColor: "#0F0F10",
        height: "100vh",
        width: open ? "225px" : "60px",
        transition: "width 0.3s",
        color: "#fff",
      }}
    >
      {/* SideBar Options */}
      <div className="flex-grow-1 py-3" style={{padding:'100px 0px'}}>
        <SideBarOption
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          link={user.role === "Student" ? "/home" : "/home/teacher"}
          open={open}
        />

        <SideBarOption
          Icon={MdAssignment}
          title={user.role === "Student" ? "Assignments" : "Add Courses"}
          selected={selected}
          setSelected={setSelected}
          link={user.role === "Student" ? "/home" : "/home/teacher-add-course"}
          open={open}
          notifs={3}
        />

        {user.role === "Student" && (
          <SideBarOption
            Icon={MdOutlineMenuBook}
            title="My Courses"
            selected={selected}
            setSelected={setSelected}
            link="/home/mycourses"
            open={open}
          />
        )}

        <SideBarOption
          Icon={FaCalendarAlt}
          title="Calendar"
          selected={selected}
          setSelected={setSelected}
          link="/home/calendar"
          open={open}
        />

        <SideBarOption
          Icon={FaBlog}
          title="Blog"
          selected={selected}
          setSelected={setSelected}
          link="/home/blog"
          open={open}
        />

        <SideBarOption
          Icon={CgProfile}
          title="Profile"
          selected={selected}
          setSelected={setSelected}
          link={user.role === "Student" ? "/profile" : "/teacherProfile"}
          open={open}
        />
      </div>

      <button
        className="btn btn-light border-top w-100 py-3"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="d-flex align-items-center justify-content-center">
          <FiChevronsRight
            className={`me-2 ${open ? "rotate-180" : ""}`}
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
          {open && <span>Hide</span>}
        </div>
      </button>
      {/* Toggle Button */}
    </nav>
  );
};

const SideBarOption = ({
  Icon,
  title,
  selected,
  setSelected,
  link,
  open,
  notifs,
}) => (
  <Link to={link} className="text-decoration-none">
    <button
      className={`btn w-100 d-flex align-items-center ${
        selected === title ? "bg-light text-primary" : "text-dark"
      }`}
      onClick={() => setSelected(title)}
      style={{
        padding: "10px 15px",
        borderRadius: "4px",
        marginBottom: "5px",
        transition: "background-color 0.3s",
      }}
    >
      <span className="d-flex align-items-center">
        <Icon size={20} />
        {open && <span className="ms-2">{title}</span>}
      </span>
      {notifs && open && (
        <span className="badge bg-primary ms-auto">{notifs}</span>
      )}
    </button>
  </Link>
);

const Logo = () => (
  <div
    className="d-flex justify-content-center align-items-center bg-primary text-white"
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
    }}
  >
    <span>M</span>
  </div>
);

const ExampleContent = () => (
  <div className="flex-grow-1 bg-light p-3" style={{ height: "100vh" }}>
    <h1>Content Area</h1>
  </div>
);

export default SideBar
