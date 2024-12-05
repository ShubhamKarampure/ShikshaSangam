import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import { MeetingAppProvider } from "./MeetingAppContextDef.jsx";
import { MeetingContainer } from "./meeting/MeetingContainer.jsx";
import { LeaveScreen } from "./components/screens/LeaveScreen.jsx";
import { JoiningScreen } from "./components/screens/JoiningScreen.jsx";
import { useParams } from "react-router-dom";
import "./index.css";

function Meet() {
  const { initialToken, initialMeetingId, initialParticipantName } =
    useParams();
  const [token, setToken] = useState(initialToken);
  const [meetingId, setMeetingId] = useState(initialMeetingId);
  const [participantName, setParticipantName] = useState(
    initialParticipantName
  );
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [customAudioStream, setCustomAudioStream] = useState(null);
  const [customVideoStream, setCustomVideoStream] = useState(null);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);
  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  useEffect(() => {
    // Dynamically load Tailwind CSS only on the /meet page
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/app/(social)/live/index.css"; // Path to the stylesheetattribute

    document.head.appendChild(link);

    return () => {
      const stylesToRemove = document.querySelectorAll(
        "style[data-vite-dev-id]"
      );
      console.log("main",stylesToRemove);
      
      // Loop through and remove each style tag
      stylesToRemove.forEach((style) => {
        if (
          String(style["attributes"][1].value).includes("src/app/(social)/live/index.css")
        ) {
          console.log("removed",style);
          
          style.remove();
        }
      });
      const links=document.querySelectorAll('link[rel="stylesheet"]');

      links.forEach((link)=>{
        if(link.href.includes('/src/app/(social)/live/index.css')){
          
          link.remove();
        }
      })
    };
  });
  return (
    <MeetingAppProvider>
      {isMeetingStarted ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: micOn,
            webcamEnabled: webcamOn,
            name: participantName ? participantName : "TestUser",
            multiStream: true,
            customCameraVideoTrack: customVideoStream,
            customMicrophoneAudioTrack: customAudioStream,
          }}
          token={token}
          reinitialiseMeetingOnConfigChange={true}
          joinWithoutUserInteraction={true}
        >
          <MeetingContainer
            onMeetingLeave={() => {
              setToken("");
              setMeetingId("");
              setParticipantName("");
              setWebcamOn(false);
              setMicOn(false);
              setMeetingStarted(false);
            }}
            setIsMeetingLeft={setIsMeetingLeft}
          />
        </MeetingProvider>
      ) : isMeetingLeft ? (
        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
      ) : (
        <JoiningScreen
          participantName={participantName}
          setParticipantName={setParticipantName}
          setMeetingId={setMeetingId}
          setToken={setToken}
          micOn={micOn}
          setMicOn={setMicOn}
          webcamOn={webcamOn}
          meetingId={meetingId}
          setWebcamOn={setWebcamOn}
          customAudioStream={customAudioStream}
          setCustomAudioStream={setCustomAudioStream}
          customVideoStream={customVideoStream}
          setCustomVideoStream={setCustomVideoStream}
          onClickStartMeeting={() => {
            setMeetingStarted(true);
          }}
          startMeeting={isMeetingStarted}
          setIsMeetingLeft={setIsMeetingLeft}
        />
      )}
    </MeetingAppProvider>
  );
}

export default Meet;
