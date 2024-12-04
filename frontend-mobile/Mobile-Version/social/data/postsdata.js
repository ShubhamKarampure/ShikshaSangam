import User from "./models/UserClass";
import { COMMENTS } from "./CommentSectionData";

// export let posts = [
//   {
//     post_id: 1,
//     profile_id: 1,
//     username: "John Doe",
//     avatar: "https://via.placeholder.com/150", // username's profile image
//     image:
//       "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Post image
//     timestamp: "5 minutes ago",
//     title: "Exploring the world of React Native",
//     content:
//       "React Native is an exciting framework for building mobile apps using JavaScript. It allows developers to use the same codebase for both Android and iOS.",
//     likes: 34,
//     commentsCount: 3,
//     comments: COMMENTS.slice(0, 3), // Unique subset of comments
//   },
//   {
//     post_id: 2,
//     profile_id: 2,
//     username: "Jane Smith",
//     avatar: "https://via.placeholder.com/150", // username's profile image
//     image:
//       "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Post image
//     timestamp: "2 hours ago",
//     title: "Understanding Redux in React Native",
//     content:
//       "Redux is a predictable state container for JavaScript apps. It helps manage the state of an application in a way that is both predictable and easy to debug.",
//     likes: 50,
//     commentsCount: 20,
//     comments: COMMENTS.slice(0, 20), // Unique subset of comments
//   },
//   {
//     post_id: 3,
//     profile_id: 3,
//     username: "Alice Johnson",
//     avatar: "https://via.placeholder.com/150/FF5733/FFFFFF", // username's profile image
//     image:
//       "https://plus.unsplash.com/premium_photo-1690303193705-eec163806599?q=80&w=384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Post image
//     timestamp: "1 day ago",
//     title: "Mastering JavaScript for Mobile Development",
//     content:
//       "JavaScript is the backbone of web development and is increasingly used in mobile app development. Here are some tips to master JavaScript for mobile app development.",
//     likes: 12,
//     commentsCount: 6,
//     comments: COMMENTS.slice(6, 12), // Unique subset of comments
//   },
//   {
//     post_id: 4,
//     profile_id: 4,
//     username: "Robert Williams",
//     avatar: "https://via.placeholder.com/150/28a745/FFFFFF", // username's profile image
//     image:
//       "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3", // Post image
//     timestamp: "3 days ago",
//     title: "Why TypeScript is a Game Changer",
//     content:
//       "TypeScript introduces static typing to JavaScript, making it easier to catch errors early in the development process. It's a must-know for serious developers.",
//     likes: 25,
//     commentsCount: 9,
//     comments: COMMENTS.slice(9, 18), // Unique subset of comments
//   },
//   {
//     post_id: 5,
//     profile_id: 5,
//     username: "Emma Davis",
//     avatar: "https://via.placeholder.com/150/f39c12/FFFFFF", // username's profile image
//     image:
//       "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3", // Post image
//     timestamp: "5 days ago",
//     title: "10 Tips for Writing Cleaner Code",
//     content:
//       "Clean code is essential for maintainable and scalable applications. Here are ten tips to help you write better, more efficient code.",
//     likes: 47,
//     commentsCount: 1,
//     comments: COMMENTS.slice(12, 13), // Unique subset of comments
//   },
//   {
//     post_id: 6,
//     profile_id: 6,
//     username: "Lucas Brown",
//     avatar: "https://via.placeholder.com/150/6c757d/FFFFFF", // username's profile image
//     image:
//       "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Post image
//     timestamp: "1 week ago",
//     title: "Understanding State Management in React",
//     content:
//       "Managing state in a React app can be tricky. This guide will walk you through the most popular state management techniques and libraries.",
//     likes: 68,
//     commentsCount: 5,
//     comments: COMMENTS.slice(14, 19), // Unique subset of comments
//   },
// ];


export const posts = [
  {
    post: {
      id: 1,
      content: '"Test Post"',
      media: null,
      created_at: "2024-11-30T18:51:37.252869Z",
      updated_at: "2024-11-30T18:51:37.252869Z",
      userprofile: 1,
    },
    user: {
      username: "college_admin",
      profile_id: 1,
      avatar: null,
      num_followers: 0,
      bio: null,
    },
    post_stats: {
      likes: 10,
      comments: 3,
      shares: 0,
      time_since_post: "3 days, 21 hours",
    },
    comments_count: 3,
  },
  {
    post: {
      id: 3,
      content: "Post from demo college user",
      media:
        "https://plus.unsplash.com/premium_photo-1690303193705-eec163806599?q=80&w=384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      created_at: "2024-11-30T21:24:05.364109Z",
      updated_at: "2024-11-30T21:24:05.364109Z",
      userprofile: 7,
    },
    user: {
      username: "aj",
      profile_id: 7,
      avatar: "https://via.placeholder.com/150/FF5733/FFFFFF",
      num_followers: 0,
      bio: "Changed Bio through put",
    },
    post_stats: {
      likes: 6,
      comments: 0,
      shares: 0,
      time_since_post: "3 days, 18 hours",
    },
    comments_count: 0,
  },
  {
    post: {
      id: 4,
      content: "Excited to share leetcode milestone",
      media:
        "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      created_at: "2024-12-02T22:29:15.409766Z",
      updated_at: "2024-12-02T22:29:15.409766Z",
      userprofile: 3,
    },
    user: {
      username: "alumni_demo",
      profile_id: 3,
      avatar:
        "http://res.cloudinary.com/dhp4wuv2x/image/upload/v1733055942/shikshasangam/avatar/ap1pqjspdbeeyj3zls9e.jpg",
      num_followers: 1,
      bio: "Helping and Growing",
    },
    post_stats: {
      likes: 9,
      comments: 3,
      shares: 0,
      time_since_post: "1 day, 17 hours",
    },
    comments_count: 3,
  },
  {
    post: {
      id: 2,
      content: '"Test Post"',
      media:
        "https://plus.unsplash.com/premium_photo-1690303193705-eec163806599?q=80&w=384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      created_at: "2024-11-30T18:55:53.698543Z",
      updated_at: "2024-11-30T18:55:53.698543Z",
      userprofile: 1,
    },
    user: {
      username: "college_admin",
      profile_id: 1,
      avatar: null,
      num_followers: 0,
      bio: null,
    },
    post_stats: {
      likes: 13,
      comments: 5,
      shares: 0,
      time_since_post: "3 days, 21 hours",
    },
    comments_count: 5,
  },
  {
    post: {
      id: 5,
      content: "blah",
      media:
        "https://plus.unsplash.com/premium_photo-1690303193705-eec163806599?q=80&w=384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      created_at: "2024-12-03T19:35:57.712011Z",
      updated_at: "2024-12-03T19:35:57.712011Z",
      userprofile: 7,
    },
    user: {
      username: "aj",
      profile_id: 7,
      avatar: "https://via.placeholder.com/150/FF5733/FFFFFF",
      num_followers: 0,
      bio: "Changed Bio through put",
    },
    post_stats: {
      likes: 1,
      comments: 0,
      shares: 0,
      time_since_post: "20 hours, 20 minutes",
    },
    comments_count: 0,
  },
  {
    post: {
      id: 6,
      content: "Blehh",
      media:
        "https://plus.unsplash.com/premium_photo-1690303193705-eec163806599?q=80&w=384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      created_at: "2024-12-03T19:58:41.171495Z",
      updated_at: "2024-12-03T19:58:41.171495Z",
      userprofile: 7,
    },
    user: {
      username: "aj",
      profile_id: 7,
      avatar: "https://via.placeholder.com/150/FF5733/FFFFFF",
      num_followers: 0,
      bio: "Changed Bio through put",
    },
    post_stats: {
      likes: 23,
      comments: 0,
      shares: 0,
      time_since_post: "19 hours, 57 minutes",
    },
    comments_count: 0,
  },
  {
    post: {
      id: 7,
      content: "Talha goat",
      media:
        "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      created_at: "2024-12-03T20:02:11.908659Z",
      updated_at: "2024-12-03T20:02:11.908659Z",
      userprofile: 7,
    },
    user: {
      username: "aj",
      profile_id: 7,
      avatar: "https://via.placeholder.com/150/FF5733/FFFFFF",
      num_followers: 0,
      bio: "Changed Bio through put",
    },
    post_stats: {
      likes: 50,
      comments: 2,
      shares: 0,
      time_since_post: "19 hours, 54 minutes",
    },
    comments_count: 0,
  },
  {
    post: {
      id: 8,
      content: "Dreams",
      media:
        "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      created_at: "2024-12-03T20:11:18.372448Z",
      updated_at: "2024-12-03T20:11:18.372448Z",
      userprofile: 7,
    },
    user: {
      username: "aj",
      profile_id: 7,
      avatar: "https://via.placeholder.com/150/FF5733/FFFFFF",
      num_followers: 0,
      bio: "Changed Bio through put",
    },
    post_stats: {
      likes: 72,
      comments: 1,
      shares: 0,
      time_since_post: "19 hours, 45 minutes",
    },
    comments_count: 0,
  },
  {
    post: {
      id: 9,
      content: "Hhh",
      media:
        "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      created_at: "2024-12-04T14:26:29.465617Z",
      updated_at: "2024-12-04T14:26:29.465617Z",
      userprofile: 7,
    },
    user: {
      username: "aj",
      profile_id: 7,
      avatar: "https://via.placeholder.com/150/FF5733/FFFFFF",
      num_followers: 0,
      bio: "Changed Bio through put",
    },
    post_stats: {
      likes: 6,
      comments: 5,
      shares: 0,
      time_since_post: "1 hour, 29 minutes",
    },
    comments_count: 0,
  },
];