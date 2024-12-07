export const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dhp4wuv2x";
export const CLOUDINARY_CLOUD_NAME= "dhp4wuv2x"
export const processImageUrl = (partialUrl) => {
  if(partialUrl===null){
    console.log('Got partialUrl as null');
    return;
  }
  if (!partialUrl?.startsWith("http")) {
    return `${CLOUDINARY_BASE_URL}/${partialUrl}`;
  }
  return partialUrl; // Already a full URL
};

export const defaultAvatar = (name)=>{
  if(name===null){
    name = "NULL NAME";
    console.log('Provided null name in defaultAvatar utility function');
    return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`;;
  }
  return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`;
}
