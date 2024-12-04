import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from "@/context/useNotificationContext";

export function LeaveScreen({ setIsMeetingLeft }) {
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();
  showNotification({
    message: "You left the meeting!",
    variant: "danger",
  });
  navigate('/messaging');
  return (
   null
  );
}
