import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "@/utils/get-token";

export const uploadCSV = async (file) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
//   const { showNotification } = useNotificationContext();
  if (!token) {
    throw new Error("Token is missing");
  }

  const formData = new FormData();
  for(let i = 0; i < file.length; i++){
    formData.append("files", file[i]);
  }

  const response = await fetch(API_ROUTES.UPLOAD_CSV, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    
    throw new Error(`Error: ${response.status}`);
  } else {
    console.log("Uploaded");
    
  }
  return await response.json();
};
