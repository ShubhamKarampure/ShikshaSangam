import { BsBell, BsBellFill, BsBookmarkHeartFill, BsCalendarEventFill, BsCameraReels, BsCardChecklist, BsChatLeft, BsChatLeftText, BsCollectionFill, BsFolder, BsGearWideConnected, BsHouse, BsImages, BsNewspaper, BsPeople, BsUiRadiosGrid } from 'react-icons/bs';
export const menuData = [{
  label: 'Home',
  icon: BsHouse
}, {
  label: 'Albums',
  icon: BsFolder
}, {
  label: 'Groups',
  icon: BsPeople
}, {
  label: 'messaging',
  icon: BsChatLeft,
  isBadge: true
}, {
  label: 'Notifications',
  icon: BsBell,
  isBadge: true
}, {
  label: 'My network',
  icon: BsUiRadiosGrid,
  isBadge: true
}];
export const leftSidebarData = [{
  icon: BsCardChecklist,
  label: 'Feed',
  url: '/profile/feed'
}, {
  icon: BsPeople,
  label: 'Connections',
  url: '/profile/connections'
}, {
  icon: BsNewspaper,
  label: 'Latest News',
  url: '/blogs'
}, {
  icon: BsCalendarEventFill,
  label: 'Events',
  url: '/feed/events'
}, {
  icon: BsCollectionFill,
  label: 'Groups',
  url: '/feed/groups'
}, {
  icon: BsBellFill,
  label: 'Notifications',
  url: '/notifications'
}, {
  icon: BsGearWideConnected,
  label: 'Settings',
  url: '/settings/account'
}, {
  icon: BsImages,
  label: 'Photos',
  url: '/feed/albums'
}, {
  icon: BsBookmarkHeartFill,
  label: 'Celebration',
  url: '/feed/celebration'
}, {
  icon: BsCameraReels,
  label: 'Video',
  url: '/feed/post-videos'
}, {
  icon: BsChatLeftText,
  label: 'Messaging',
  url: '/messaging'
}];