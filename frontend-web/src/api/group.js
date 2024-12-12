import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "@/utils/get-token"
export const createGroup = async (formData) => {
    const token = getTokenFromCookie();
    const response = await fetch(API_ROUTES.GROUPS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Ensure you send `FormData` to handle images
    });
  
    if (!response.ok) {
      throw new Error("Failed to create group");
    }
  
    return await response.json();
  };


  export const getAllGroups = async () => {
    const token = getTokenFromCookie(); // Retrieve token
    if (!token) throw new Error("Authorization token is missing.");
  
    const response = await fetch(API_ROUTES.GROUPS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include authorization header
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch groups");
    }
    
  
   const responseData =  await response.json(); // Return the groups data
   console.log("Response from getAllGroups" , responseData);
   return responseData;
   
    
  };

  export const GroupParticipate = async (groupId) => {
    const token = getTokenFromCookie(); // Retrieve token
    if (!token) throw new Error("Authorization token is missing.");
  
    const response = await fetch(API_ROUTES.PARTICIPATE(groupId), {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${token}`, // Include authorization header
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch groups");
    }
    
  
   const responseData =  await response.json(); // Return the groups data
   console.log("Response from getAllGroups" , responseData);
   return responseData;
   
    
  };
  