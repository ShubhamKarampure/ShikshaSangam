import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//demo pages
const HomeDemo = lazy(() => import('@/app/(social)/feed/(container)/home/page'));
const HomeClassic = lazy(() => import('@/app/(plain)/classic/page'));
const HomePost = lazy(() => import('@/app/(social)/(with-topbar)/posts/page'));
const HomeVideo = lazy(() => import('@/app/(social)/feed/(no-container)/videos/page'));
const HomeEvent = lazy(() => import('@/app/(plain)/event/page'));
const LandingPage = lazy(() => import('@/app/(plain)/landing/page'));
const AppDownloadPage = lazy(() => import('@/app/(plain)/download/page'));
const ProfileSetup = lazy(()=>import('@/app/(plain)/setup/page'))

//pages
const Albums = lazy(() => import('@/app/(social)/feed/(container)/albums/page'));
const Celebration = lazy(() => import('@/app/(social)/feed/(container)/celebration/page'));
const Messaging = lazy(() => import('@/app/(social)/(with-topbar)/messaging/page'));
const Events = lazy(() => import('@/app/(social)/feed/(container)/events/page'));
const Events2 = lazy(() => import('@/app/(social)/(with-topbar)/events/page'));
const EventDetails = lazy(() => import('@/app/(social)/feed/(container)/events/[eventId]/page'));
const EventDetails2 = lazy(() => import('@/app/(plain)/events/details/page'));
const Groups = lazy(() => import('@/app/(social)/feed/(container)/groups/page'));
const GroupDetails = lazy(() => import('@/app/(social)/feed/(container)/groups/[groupId]/page'));
const PostVideos = lazy(() => import('@/app/(social)/feed/(container)/post-videos/page'));
const PostVideoDetails = lazy(() => import('@/app/(social)/feed/(container)/post-videos/details/page'));
const PostDetails = lazy(() => import('@/app/(social)/(with-topbar)/feed/post-details/page'));
const VideoDetails = lazy(() => import('@/app/(social)/feed/(no-container)/videos/details/page'));
const Blogs = lazy(() => import('@/app/(social)/(with-topbar)/blogs/page'));
const BlogDetails = lazy(() => import('@/app/(social)/(with-topbar)/blogs/[blogId]/page'));
const AlumniUpload = lazy(()=>import('@/app/(admin)/uploadAlumni/page'))

//profile pages
const ProfileFeed = lazy(() => import('@/app/(social)/profile/feed/page'));
const ProfileAbout = lazy(() => import('@/app/(social)/profile/about/page'));
const ProfileConnections = lazy(() => import('@/app/(social)/profile/connections/page'));
const ProfileMedia = lazy(() => import('@/app/(social)/profile/media/page'));
const ProfileVideos = lazy(() => import('@/app/(social)/profile/videos/page'));
const ProfileEvents = lazy(() => import('@/app/(social)/profile/events/page'));
const ProfileActivity = lazy(() => import('@/app/(social)/profile/activity/page'));

//account pages
const CreatePage = lazy(() => import('@/app/(social)/feed/(container)/create-page/page'));
const AccountSetting = lazy(() => import('@/app/(social)/settings/account/page'));
const AccountNotifications = lazy(() => import('@/app/(social)/settings/notification/page'));
const AccountPrivacy = lazy(() => import('@/app/(social)/settings/privacy/page'));
const AccountCommunication = lazy(() => import('@/app/(social)/settings/communication/page'));
const AccountMessaging = lazy(() => import('@/app/(social)/settings/messaging/page'));
const AccountClose = lazy(() => import('@/app/(social)/settings/close-account/page'));
const HelpPage = lazy(() => import('@/app/(social)/help/page'));
const HelpDetails = lazy(() => import('@/app/(social)/help/details/page'));
const NotificationPage = lazy(() => import('@/app/(social)/(with-topbar)/notifications/page'));

//auth routes
const SignIn = lazy(() => import('@/app/(plain)/(authentication)/auth/sign-in/page'));
const SignUp = lazy(() => import('@/app/(plain)/(authentication)/auth/sign-up/page'));
const ForgotPass = lazy(() => import('@/app/(plain)/(authentication)/auth/forgot-pass/page'));
const NotFoundPage = lazy(() => import('@/app/(social)/(with-topbar)/not-found/page'));
const OfflinePage = lazy(() => import('@/app/(plain)/offline/page'));
const PrivacyAndTermPage = lazy(() => import('@/app/(social)/(with-topbar)/privacy-terms/page'));

const initialRoutes = [{
  path: '/',
  name: 'root',
  element: <Navigate to="/feed/home" />
}
];

// feed with container
const generalRoutes = [{
  path: '/feed/home',
  name: 'Demo Home',
  element: <HomeDemo />
}, {
  path: '/feed/albums',
  name: 'Albums',
  element: <Albums />
}, {
  path: '/feed/celebration',
  name: 'Celebration',
  element: <Celebration />
}, {
  path: '/feed/events',
  name: 'Events',
  element: <Events />
}, {
  path: '/feed/events/:eventId',
  name: 'Events',
  element: <EventDetails />
}, {
  path: '/feed/groups',
  name: 'Groups',
  element: <Groups />
}, {
  path: '/feed/groups/:groupId',
  name: 'Group Details',
  element: <GroupDetails />
}, {
  path: '/feed/post-videos',
  name: 'Post Videos',
  element: <PostVideos />
}, {
  path: '/feed/post-videos/details',
  name: 'Post Video Details',
  element: <PostVideoDetails />
}, {
  path: '/feed/create-page',
  name: 'Create Page',
  element: <CreatePage />
}];

//plain routes
const otherRoutes = [{
  path: '/classic',
  name: 'Home Classic',
  element: <HomeClassic />
}, {
  path: '/event',
  name: 'Home Event',
  element: <HomeEvent />
}, {
  path: '/landing',
  name: 'Home Landing',
  element: <LandingPage />
}, {
  path: '/download',
  name: 'Home Download',
  element: <AppDownloadPage />
}, {
  path: '/events/details',
  name: 'Event Details 2',
  element: <EventDetails2 />
}, {
  path: '/feed/videos',
  name: 'Home Video',
  element: <HomeVideo />
}, {
  path: '/feed/videos/details',
  name: 'Video Details',
  element: <VideoDetails />
}, {
  path: '/help',
  name: 'Help',
  element: <HelpPage />
}, {
  path: '/help/details',
  name: 'Help Details',
  element: <HelpDetails />
}, {
  path: '/offline',
  name: 'Offline',
  element: <OfflinePage />
  },
  {
  path: '/profile-setup',
  name: 'Profile Setup',
  element: <ProfileSetup/>
  }
];
export const settingPagesRoutes = [{
  path: '/settings/account',
  name: 'Account Settings',
  element: <AccountSetting />
}, {
  path: '/settings/notification',
  name: 'Account Notification',
  element: <AccountNotifications />
}, {
  path: '/settings/communication',
  name: 'Account Notification',
  element: <AccountCommunication />
}, {
  path: '/settings/messaging',
  name: 'Account Messaging',
  element: <AccountMessaging />
}, {
  path: '/settings/close-account',
  name: 'Account Close',
  element: <AccountClose />
}, {
  path: '/settings/privacy',
  name: 'Account Privacy',
  element: <AccountPrivacy />
}];

//social pages with topbar
export const socialWithTopbarRoutes = [{
  path: '/posts',
  name: 'Home Posts',
  element: <HomePost />
}, {
  path: '/messaging',
  name: 'Messaging',
  element: <Messaging />
}, {
  path: '/notifications',
  name: 'Notification',
  element: <NotificationPage />
}, {
  path: '/events',
  name: 'Events',
  element: <Events2 />
}, {
  path: '/feed/post-details',
  name: 'Post Details',
  element: <PostDetails />
}, {
  path: '/blogs',
  name: 'Blogs',
  element: <Blogs />
}, {
  path: '/blogs/:blogId',
  name: 'Blog Details',
  element: <BlogDetails />
}, {
  path: '/privacy-terms',
  name: 'Privacy And Terms',
  element: <PrivacyAndTermPage />
}, {
  path: '*',
  name: 'not-found',
  element: <NotFoundPage />
}, {
  path: '/not-found',
  name: 'Not Found',
  element: <NotFoundPage />
}];
export const profilePagesRoutes = [{
  path: '/profile/feed',
  name: 'Feed',
  element: <ProfileFeed />
}, {
  path: '/profile/about',
  name: 'About',
  element: <ProfileAbout />
}, {
  path: '/profile/connections',
  name: 'Connections',
  element: <ProfileConnections />
}, {
  path: '/profile/media',
  name: 'Media',
  element: <ProfileMedia />
}, {
  path: '/profile/videos',
  name: 'Video',
  element: <ProfileVideos />
}, {
  path: '/profile/events',
  name: 'Events',
  element: <ProfileEvents />
}, {
  path: '/profile/activity',
  name: 'Activity',
  element: <ProfileActivity />
}];
export const authRoutes = [{
  path: '/auth/sign-in',
  name: 'Sign In',
  element: <SignIn />
}, {
  path: '/auth/sign-up',
  name: 'Sign Up',
  element: <SignUp />
}, {
  path: '/auth/forgot-pass',
  name: 'Sign In',
  element: <ForgotPass />
}];

export const adminRoutes = [{
  path: '/admin/upload-alumni',
  name: 'Upload Alumni',
  element: <AlumniUpload />
}];
export const appRoutes = [...otherRoutes];
export const feedRoutes = [...initialRoutes, ...generalRoutes];