import { API_ROUTES } from "../routes/apiRoute";

export const fetchJobs = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch jobs.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await fetch(API_URL, {
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
