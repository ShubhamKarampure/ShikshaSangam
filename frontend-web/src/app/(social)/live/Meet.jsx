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
    link.href = "/src/app/(social)/live/index.css"; // Path to the stylesheet
    link.dataset.viteDevId =
      "D:/Self/SIH/frontend-web/src/app/(social)/live/index.css"; // Same data attribute

    document.head.appendChild(link);

    return () => {
      let styleSheet = document.querySelector(
        'style[data-vite-dev-id="D:/Self/SIH/frontend-web/src/app/(social)/live/index.css"]'
      );

      // Remove it from the DOM
      if (styleSheet) {
        styleSheet.remove();
      }
      if (link) {
        document.head.removeChild(link);
      }
      console.log(document.head);
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
