import { celebrationData } from '@/assets/data/celebrations';
import { notificationData } from '@/assets/data/notification';
import { eventScheduleData, mediaData, userConnections, users } from '@/assets/data/other';
import { blogsData, eventData, groupsData, postVideosData, socialCommentsData, socialPostsData, trendingVideos } from '@/assets/data/social';
import { sleep } from '@/utils/promise';
export const getAllUsers = async () => {
  await sleep();
  return users;
};
export const getAllNotifications = async () => {
  await sleep();
  return notificationData;
};
export const getAllEvents = async () => {
  await sleep();
  return eventData;
};
export const getEventById = async id => {
  const data = eventData.find(event => event.id === id);
  await sleep();
  return data;
};
export const getGroupById = async id => {
  const data = groupsData.find(group => group.id === id);
  await sleep();
  return data;
};
export const getAllGroups = async () => {
  await sleep();
  return groupsData;
};
export const getAllMedia = async () => {
  await sleep();
  return mediaData;
};
export const getAllBlogs = async () => {
  await sleep();
  return blogsData;
};
export const getAllEventSchedules = async () => {
  const data = eventScheduleData.map(schedule => {
    const user = users.find(user => user.id === schedule.userId);
    const speakers = schedule.speakerId.map(speaker => {
      const teamSpeaker = users.find(user => user.id === speaker);
      if (teamSpeaker) {
        return teamSpeaker;
      }
    });
    return {
      ...schedule,
      user,
      speakers
    };
  });
  await sleep();
  return data;
};
export const getAllUserConnections = async () => {
  const data = userConnections.map(connection => {
    const user = users.find(user => user.id === connection.userId);
    return {
      ...connection,
      user
    };
  });
  await sleep();
  return data;
};
export const getAllCelebrations = async () => {
  const data = celebrationData.map(celebration => {
    const user = users.find(user => user.id === celebration.userId);
    return {
      ...celebration,
      user
    };
  });
  await sleep();
  return data;
};
export const getAllTrendingVideos = async () => {
  const data = trendingVideos.map(video => {
    const user = users.find(user => user.id === video.userId);
    return {
      ...video,
      user
    };
  });
  await sleep();
  return data;
};
export const getAllPostVideos = async () => {
  const data = postVideosData.map(video => {
    const user = users.find(user => user.id === video.userId);
    return {
      ...video,
      user
    };
  });
  await sleep();
  return data;
};
export const getUserById = async id => {
  const data = users.find(user => user.id === id);
  await sleep();
  return data;
};
export const getBlogById = async id => {
  const data = blogsData.find(blog => blog.id === id);
  await sleep();
  return data;
};
export const getUserForAllComments = commentsData => {
  return commentsData.map(comment => {
    const socialUser = users.find(user => user.id === comment.socialUserId);
    if (comment.children) {
      comment.children = getUserForAllComments(comment.children);
    }
    return {
      ...comment,
      socialUser
    };
  });
};
export const getAllFeeds = async () => {
  const data = socialPostsData.map(post => {
    const socialUser = users.find(user => user.id === post.socialUserId);
    const commentsData = socialCommentsData.filter(comment => comment.postId === post.id);
    let comments;
    if (commentsData.length) {
      comments = getUserForAllComments(commentsData);
    }
    return {
      ...post,
      socialUser,
      comments
    };
  });
  await sleep();
  return data;
};