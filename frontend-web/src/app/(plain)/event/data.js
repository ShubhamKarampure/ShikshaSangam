import eventImg1 from '@/assets/images/icon/badge-outline-filled.svg';
import eventImg2 from '@/assets/images/icon/clipboard-outline-filled.svg';
import eventImg3 from '@/assets/images/icon/home-outline-filled.svg';
import eventImg4 from '@/assets/images/icon/clock-outline-filled.svg';
import eventImg5 from '@/assets/images/icon/imac-outline-filled.svg';
import album1 from '@/assets/images/albums/01.jpg';
import album2 from '@/assets/images/albums/02.jpg';
import album4 from '@/assets/images/albums/04.jpg';
import album5 from '@/assets/images/albums/05.jpg';
import { BsApple, BsGlobe, BsPhone, BsWindows } from 'react-icons/bs';
export const eventCategories = [{
  name: 'Arts & Entertainment',
  image: eventImg1
}, {
  name: 'Business & Conferences',
  image: eventImg2
}, {
  name: 'PNY E-Gaming Fest',
  image: eventImg3
}, {
  name: 'Events & Parties',
  image: eventImg4
}, {
  name: 'Sports & Wellness',
  image: eventImg5
}];
export const topDestinations = [{
  location: 'California',
  category: 'Business & Conferences',
  image: album2
}, {
  location: 'Los Angeles',
  category: 'Events & Parties',
  image: album4
}, {
  location: 'London',
  category: 'Arts & Entertainment',
  image: album5
}, {
  location: 'London',
  category: 'Arts & Entertainment',
  image: album1
}];
export const footerData = [{
  title: 'Download',
  items: [{
    icon: BsGlobe,
    label: 'Web Browser'
  }, {
    icon: BsWindows,
    label: 'Windows'
  }, {
    icon: BsApple,
    label: 'macOS'
  }, {
    icon: BsPhone,
    label: 'iOS & Android'
  }]
}, {
  title: 'About',
  items: [{
    label: 'About social'
  }, {
    label: 'Security'
  }, {
    label: 'Customer Support'
  }, {
    label: 'Partners'
  }, {
    label: 'Careers - Join Us!'
  }]
}, {
  title: 'Resources',
  items: [{
    label: 'Join'
  }, {
    label: 'Help Center'
  }, {
    label: 'Developers'
  }, {
    label: 'Status'
  }, {
    label: 'Communities'
  }]
}];