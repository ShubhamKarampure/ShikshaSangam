import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "../utils/get-token";

const handleFetch = async (url, method, body = null, additionalParams = {}) => {
  const token = getTokenFromCookie();

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method: method,
    headers: headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // Construct URL with query parameters
  const fullUrl = new URL(url);
  Object.entries(additionalParams).forEach(([key, value]) => {
    fullUrl.searchParams.append(key, value);
  });

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

export const fetchEvents = async (eventId = null) => {
  const params = eventId ? { event_id: eventId } : {};
  return await handleFetch(API_ROUTES.LIST_EVENTS, "GET", null, params);
};

export const createEvent = async (eventData) => {
  return await handleFetch(API_ROUTES.CREATE_EVENT, "POST", eventData);
};

export const getEventDetails = async (eventId) => {
  return await handleFetch(API_ROUTES.GET_EVENT(eventId), "GET");
};

export const updateEvent = async (eventId, eventData) => {
  return await handleFetch(API_ROUTES.UPDATE_EVENT(eventId), "PUT", eventData);
};

export const deleteEvent = async (eventId) => {
  return await handleFetch(API_ROUTES.DELETE_EVENT(eventId), "DELETE");
};