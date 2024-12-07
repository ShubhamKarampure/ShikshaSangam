import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPaperclip, faCheck, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const GroupDetails = () => {
  return (
    <div className="container-fluid py-5 bg-dark text-light">
      {/* Group Chat Button */}
      <div className="row mt-4 justify-content-center">
        <div className="col-12 text-center">
          <button className="btn btn-lg btn-info text-dark rounded-pill shadow-sm hover-effect">
            <FontAwesomeIcon icon={faCommentDots} className="me-2" />
            Open Group Chat
          </button>
        </div>
      </div>

      {/* Course Introduction */}
      <div className="row mb-4">
        <div className="col-12">
          {/* Course 1 */}
          <div className="card bg-dark text-light shadow-lg rounded-lg mb-3">
            <div className="card-header">
              <h2 className="card-title fs-3 fw-bold text-primary">Introduction to React</h2>
            </div>
            <img src="https://via.placeholder.com/800x200" alt="Course banner" className="card-img-top rounded-top" />
            <div className="card-body">
              <p className="card-text">Learn the fundamentals of React, including components, state, and props. This course will guide you through building your first React application.</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-primary me-2 hover-effect">Take Quiz</button>
              <button className="btn btn-outline-primary hover-effect">Generate Quiz</button>
            </div>
          </div>

          {/* Course 2 */}
          <div className="card bg-dark text-light shadow-lg rounded-lg mb-3">
            <div className="card-header">
              <h2 className="card-title fs-3 fw-bold text-primary">Mastering JavaScript</h2>
            </div>
            <img src="https://via.placeholder.com/800x200" alt="Course banner" className="card-img-top rounded-top" />
            <div className="card-body">
              <p className="card-text">Dive deep into JavaScript with advanced topics such as closures, promises, and async/await. Perfect for building dynamic web applications.</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-primary me-2 hover-effect">Take Quiz</button>
              <button className="btn btn-outline-primary hover-effect">Generate Quiz</button>
            </div>
          </div>

          {/* Course 3 */}
          <div className="card bg-dark text-light shadow-lg rounded-lg mb-3">
            <div className="card-header">
              <h2 className="card-title fs-3 fw-bold text-primary">CSS Mastery</h2>
            </div>
            <img src="https://via.placeholder.com/800x200" alt="Course banner" className="card-img-top rounded-top" />
            <div className="card-body">
              <p className="card-text">Learn how to create beautiful and responsive web designs with advanced CSS techniques, flexbox, grid, and animations.</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-primary me-2 hover-effect">Take Quiz</button>
              <button className="btn btn-outline-primary hover-effect">Generate Quiz</button>
            </div>
          </div>

          {/* Course 4 */}
          <div className="card bg-dark text-light shadow-lg rounded-lg mb-3">
            <div className="card-header">
              <h2 className="card-title fs-3 fw-bold text-primary">Introduction to Node.js</h2>
            </div>
            <img src="https://via.placeholder.com/800x200" alt="Course banner" className="card-img-top rounded-top" />
            <div className="card-body">
              <p className="card-text">Understand the fundamentals of backend development with Node.js, and build server-side applications using Express and MongoDB.</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-primary me-2 hover-effect">Take Quiz</button>
              <button className="btn btn-outline-primary hover-effect">Generate Quiz</button>
            </div>
          </div>

        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark text-light shadow-lg rounded-lg">
            <div className="card-header">
              <h3 className="card-title fs-4">Leaderboard</h3>
              <p className="card-subtitle fs-6 text-muted">Top performers in this course</p>
            </div>
            <div className="card-body">
              <div className="chart-container" style={{ position: 'relative', height: '40vh', width: '80vw' }}>
                <canvas id="leaderboardChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
