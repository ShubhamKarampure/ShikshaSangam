import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "@/utils/get-token";

export const fetchJobs = async () => {
  try {
    const token = getTokenFromCookie();
    if(!token){
      throw new Error("Token is missing");
    }
    const response = await fetch(API_ROUTES.JOBS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch jobs.");
    }
    const data = await response.json();
    console.log("Response Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await fetch(API_ROUTES.JOBS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) {
      throw new Error("Failed to create job.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const uploadResume = async (formData) => {
    const response = await fetch(API_ROUTES.RESUME, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to upload resume");
    }
  
    return response.json();
  
  };
  
