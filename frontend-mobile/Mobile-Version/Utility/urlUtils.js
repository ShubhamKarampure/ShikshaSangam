export const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dhp4wuv2x";

export const processImageUrl = (partialUrl) => {
  if (!partialUrl.startsWith("http")) {
    return `${CLOUDINARY_BASE_URL}/${partialUrl}`;
  }
  return partialUrl; // Already a full URL
};
