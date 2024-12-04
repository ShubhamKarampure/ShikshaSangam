import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from "@/context/useNotificationContext";

export function LeaveScreen({ setIsMeetingLeft }) {
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();
  showNotification({
    message: "You left the meeting!",
    variant: "danger",
  });
  let styleSheet = document.querySelector(
    'style[data-vite-dev-id="D:/Self/SIH/frontend-web/src/app/(social)/live/index.css"]'
  );

  // Remove it from the DOM
  if (styleSheet) {
    styleSheet.remove();
  }
  navigate('/messaging');
  return (
   null
  );
}
