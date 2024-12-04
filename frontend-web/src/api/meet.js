
const API_BASE_URL = import.meta.env.VITE_VIDEOSDK_BASE_URL;
const VIDEOSDK_TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN;

export const getToken = async () => {
  return VIDEOSDK_TOKEN
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options)
  const data = await response.json()

  if (data.roomId) {
    return { meetingId: data.roomId, err: null }
  } else {
    return { meetingId: null, err: data.error }
  }

};