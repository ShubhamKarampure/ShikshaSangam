import { SiGooglemeet } from "react-icons/si";
import {useProfileContext} from "@/context/useProfileContext";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";



const MeetInvitationMessage = ({isCurrentUser=true,meetId }) => {
  const navigate=useNavigate()
  const {profile}=useProfileContext();
  const VIDEOSDK_TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN;
  const onMeetCall = (meetId) => {
    const token = VIDEOSDK_TOKEN;
    const participantName = profile.full_name;
    navigate(`/meet/${token}/${meetId}/${participantName}`);
  };
    console.log(meetId);
    return (
      <div
        className={clsx("d-flex mb-3 justify-content-center w-100")}
      >
        <div
          className={clsx(
            "p-3 rounded shadow-sm d-flex align-items-center gap-3 bg-primary text-white w-100",
            "meet-invitation"
          )}
          style={{
            cursor: "pointer",
            maxWidth: "300px",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onClick={() => onMeetCall(meetId)}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === "Enter" && onMeetCall(meetId)}
        >
          {/* Call Icon */}
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "white",
              color: "#007bff",
            }}
          >
            <SiGooglemeet className="fs-4" />
          </div>
  
          {/* Call Details */}
          <div>
            <h6 className="mb-0 fw-bold text-white">Quick Connect</h6>
            <p className="m-0 small text-white-50">Tap to join</p>
          </div>
        </div>
  
        {/* Custom Styles */}
        <style>{`
          .meet-invitation:hover {
            transform: scale(1.05);
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
          }
  
          .meet-invitation:focus {
            outline: 2px solid #007bff;
            outline-offset: 4px;
          }
        `}</style>
      </div>
    );
  };

  export default MeetInvitationMessage;