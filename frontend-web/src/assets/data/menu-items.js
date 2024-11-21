import { BsCloudDownloadFill } from 'react-icons/bs';
export const PROFILE_MENU_ITEMS = [{
  key: 'profile-feed',
  label: 'Feed',
  url: '/profile/feed',
  parentKey: 'pages-profile'
}, {
  key: 'profile-about',
  label: 'About',
  url: '/profile/about',
  parentKey: 'pages-profile'
}, {
  key: 'profile-connections',
  label: 'Connections',
  url: '/profile/connections',
  badge: {
    text: '300',
    variant: 'success'
  },
  parentKey: 'pages-profile'
}, {
  key: 'profile-media',
  label: 'Media',
  url: '/profile/media',
  parentKey: 'pages-profile'
}, {
  key: 'profile-videos',
  label: 'Videos',
  url: '/profile/videos',
  parentKey: 'pages-profile'
}, {
  key: 'profile-events',
  label: 'Events',
  url: '/profile/events',
  parentKey: 'pages-profile'
}, {
  key: 'profile-activity',
  label: 'Activity',
  url: '/profile/activity',
  parentKey: 'pages-profile'
}];
export const APP_MENU_ITEMS = [{
  key: 'demos',
  label: 'Demo',
  isTitle: true,
  children: [{
    key: 'home-default',
    label: 'Home Default',
    url: '/feed/home',
    parentKey: 'demos'
  }, {
    key: 'home-classic',
    label: 'Home Classic',
    url: '/classic',
    disabled: true,
    parentKey: 'demos'
  }, {
    key: 'home-post',
    label: 'Home Post',
    url: '/posts',
    parentKey: 'demos'
  }, {
    key: 'home-video',
    label: 'Home Video',
    url: '/feed/videos',
    parentKey: 'demos'
  }, {
    key: 'home-event',
    label: 'Home Event',
    url: '/event',
    parentKey: 'demos'
  }, {
    key: 'landing-page',
    label: 'Landing Page',
    url: '/landing',
    parentKey: 'demos'
  }, {
    key: 'app-download',
    label: 'App Download',
    url: '/download',
    parentKey: 'demos'
  }, {
    key: 'demo-divider-1',
    isDivider: true,
    parentKey: 'demos'
  }, {
    key: 'buy-social',
    label: 'Buy Social!',
    target: '_blank',
    icon: BsCloudDownloadFill,
    url: '',
    parentKey: 'demos'
  }]
}, {
  key: 'pages',
  label: 'Pages',
  isTitle: true,
  children: [{
    key: 'pages-albums',
    label: 'Albums',
    url: '/feed/albums',
    parentKey: 'pages'
  }, {
    key: 'pages-celebration',
    label: 'Celebration',
    url: '/feed/celebration',
    parentKey: 'pages'
  }, {
    key: 'pages-messaging',
    label: 'Messaging',
    url: '/messaging',
    parentKey: 'pages'
  }, {
    key: 'pages-profile',
    label: 'Profile',
    parentKey: 'pages',
    children: PROFILE_MENU_ITEMS
  }, {
    key: 'pages-events',
    label: 'Events',
    url: '/feed/events',
    parentKey: 'pages'
  }, {
    key: 'pages-events-2',
    label: 'Events 2',
    url: '/events',
    parentKey: 'pages'
  }, {
    key: 'pages-event-details',
    label: 'Event Details',
    url: '/feed/events/301',
    parentKey: 'pages'
  }, {
    key: 'event-details-2',
    label: 'Event Details 2',
    url: '/events/details',
    parentKey: 'pages'
  }, {
    key: 'pages-groups',
    label: 'Groups',
    url: '/feed/groups',
    parentKey: 'pages'
  }, {
    key: 'pages-group-details',
    label: 'Group Details',
    url: '/feed/groups/2001',
    parentKey: 'pages'
  }, {
    key: 'pages-post-videos',
    label: 'Post Videos',
    url: '/feed/post-videos',
    parentKey: 'pages'
  }, {
    key: 'pages-post-video-details',
    label: 'Post Video Details',
    url: '/feed/post-videos/details',
    parentKey: 'pages'
  }, {
    key: 'pages-post-details',
    label: 'Post Details',
    url: '/feed/post-details',
    parentKey: 'pages'
  }, {
    key: 'pages-video-details',
    label: 'Video Details',
    url: '/feed/videos/details',
    parentKey: 'pages'
  }, {
    key: 'pages-blog',
    label: 'Blog',
    url: '/blogs',
    parentKey: 'pages'
  }, {
    key: 'pages-blog-details',
    label: 'Blog Details',
    url: '/blogs/51',
    parentKey: 'pages'
  }, {
    key: 'pages-divider-1',
    isDivider: true,
    parentKey: 'pages'
  }, {
    key: 'pages-dropdown-levels',
    label: 'Dropdown Levels',
    parentKey: 'pages',
    children: [{
      key: 'dropdown-item-1-1',
      label: 'Dropdown Item',
      parentKey: 'pages-dropdown-levels'
    }, {
      key: 'dropdown-item-1-2',
      label: 'Dropdown Item',
      parentKey: 'pages-dropdown-levels'
    }, {
      key: 'dropdown-item-1-3',
      label: 'Dropdown Item',
      parentKey: 'pages-dropdown-levels',
      children: [{
        key: 'dropdown-item-2-1',
        label: 'Dropdown Item',
        parentKey: 'dropdown-item-1-3'
      }, {
        key: 'dropdown-item-2-2',
        label: 'Dropdown Item',
        parentKey: 'dropdown-item-1-3'
      }]
    }, {
      key: 'dropdown-item-1-4',
      label: 'Dropdown Item',
      parentKey: 'pages-dropdown-levels'
    }]
  }]
}, {
  key: 'accounts',
  label: 'Account',
  isTitle: true,
  children: [{
    key: 'acc-create-a-page',
    label: 'Create a page',
    url: '/feed/create-page',
    parentKey: 'accounts'
  }, {
    key: 'acc-settings',
    label: 'Settings',
    url: '/settings/account',
    parentKey: 'accounts'
  }, {
    key: 'acc-notifications',
    label: 'Notifications',
    url: '/notifications',
    parentKey: 'accounts'
  }, {
    key: 'acc-help-center',
    label: 'Help Center',
    url: '/help',
    parentKey: 'accounts'
  }, {
    key: 'acc-help-details',
    label: 'Help Details',
    url: '/help/details',
    parentKey: 'accounts'
  }, {
    key: 'acc-authentication',
    label: 'Authentication',
    parentKey: 'accounts',
    children: [{
      key: 'auth-sign-in',
      label: 'Sign In',
      url: '/auth/sign-in',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-sign-up',
      label: 'Sign Up',
      url: '/auth/sign-up',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-forgot-pass',
      label: 'Forgot Password',
      url: '/auth/forgot-pass',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-divider-1',
      isDivider: true
    }, {
      key: 'auth-sign-in-advance',
      label: 'Sign In Advance',
      url: '/auth-advance/sign-in',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-sign-up-advance',
      label: 'Sign Up Advance',
      url: '/auth-advance/sign-up',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-forgot-pass-advance',
      label: 'Forgot Password Advance',
      url: '/auth-advance/forgot-pass',
      parentKey: 'acc-authentication'
    }]
  }, {
    key: 'acc-error-404',
    label: 'Error 404',
    url: '/not-found',
    parentKey: 'accounts'
  }, {
    key: 'acc-offline',
    label: 'Offline',
    url: '/offline',
    parentKey: 'accounts'
  }, {
    key: 'acc-privacy-&-terms',
    label: 'Privacy & Terms',
    url: '/privacy-terms',
    parentKey: 'accounts'
  }]
}, {
  key: 'my-network',
  isTitle: true,
  label: 'My Network',
  url: '/profile/connections'
}];