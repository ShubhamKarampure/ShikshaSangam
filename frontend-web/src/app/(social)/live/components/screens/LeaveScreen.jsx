import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from "@/context/useNotificationContext";

export function LeaveScreen({ setIsMeetingLeft }) {
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();
  showNotification({
    message: "You left the meeting!",
    variant: "danger",
  });
  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');

  linkElements.forEach(link => {
    if (link.href.includes('/live/index.css')) {
      link.remove();
    }
  });

  const stylesToRemove = document.querySelectorAll(
    "style[data-vite-dev-id]"
  );
  console.log('Styles to remove',stylesToRemove);
  
  // Loop through and remove each style tag
  stylesToRemove.forEach((style) => {
    if (
      style["attributes"] && style["attributes"][1] && String(style["attributes"][1]).includes("src/app/(social)/live/index.css")
    ) {
      style.remove();
    }
  });

  navigate('/messaging');
  return (
   null
  );
}
