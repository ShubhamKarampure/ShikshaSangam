const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmMjUyYmE2NS00YTZlLTQ5OWYtOWIwZS1mN2IyODVmMDczZGEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMjkyMzA0MSwiZXhwIjoxNzMzNTI3ODQxfQ.gd-9mpRpGu5KwQwaHJOL8_oE8ZQZa37888D10D7QJsM';
console.log(VIDEOSDK_TOKEN)

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

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options)

  if (response.status === 400) {
    const data = await response.text()
    return { meetingId: null, err: data }
  }

  const data = await response.json()

  if (data.roomId) {
    return { meetingId: data.roomId, err: null }
  } else {
    return { meetingId: null, err: data.error }
  }

};
