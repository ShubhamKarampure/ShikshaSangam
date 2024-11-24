import post2 from '@/assets/images/post/1by1/02.jpg';
import albums1 from '@/assets/images/albums/01.jpg';
import albums2 from '@/assets/images/albums/02.jpg';
import albums3 from '@/assets/images/albums/03.jpg';
import albums4 from '@/assets/images/albums/04.jpg';
import albums5 from '@/assets/images/albums/05.jpg';
import albums6 from '@/assets/images/albums/06.jpg';
import post3 from '@/assets/images/post/1by1/03.jpg';
import post4 from '@/assets/images/post/1by1/04.jpg';
import post5 from '@/assets/images/post/1by1/05.jpg';
import post6 from '@/assets/images/post/1by1/06.jpg';
import post7 from '@/assets/images/post/1by1/07.jpg';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StoryComponent from './StoryComponent';
const timestamp = () => {
  const timeIndex = 1678166046264 / 1000;
  const random = Math.floor(Math.random() * 1000);
  return Math.round(timeIndex - random);
};
const stories = [{
  id: '1',
  name: 'Judy Nguyen',
  photo: post2,
  time: timestamp(),
  items: [{
    id: 'story-1',
    type: 'photo',
    length: 5,
    src: albums1,
    preview: albums1,
    link: '',
    linkText: false,
    time: timestamp()
  }, {
    id: 'story-2',
    type: 'video',
    length: 0,
    src: '/videos/video-call.mp4',
    preview: '',
    link: '',
    linkText: false,
    time: timestamp()
  }, {
    id: 'story-3',
    type: 'photo',
    length: 5,
    src: albums2,
    preview: albums2,
    link: '',
    linkText: false,
    time: timestamp()
  }]
}, {
  id: '3',
  name: 'Billy Vasquez',
  photo: post3,
  time: timestamp(),
  items: [{
    id: 'story-5',
    length: 5,
    src: albums3,
    type: 'photo',
    link: '',
    linkText: false,
    time: timestamp()
  }]
}, {
  id: '4',
  name: 'Amanda Reed',
  photo: post4,
  time: timestamp(),
  items: [{
    id: 'story-6',
    length: 5,
    src: albums4,
    type: 'photo',
    link: '',
    linkText: false,
    time: timestamp()
  }]
}, {
  id: '5',
  name: 'Lori Stevens',
  photo: post5,
  time: timestamp(),
  items: [{
    id: 'story-7',
    length: 5,
    src: albums5,
    type: 'photo',
    link: '',
    linkText: false,
    time: timestamp()
  }]
}, {
  id: '6',
  name: 'Samuel Bishop',
  photo: post6,
  time: timestamp(),
  items: [{
    id: 'story-8',
    length: 5,
    src: albums6,
    type: 'photo',
    link: '',
    linkText: false,
    time: timestamp()
  }]
}, {
  id: '7',
  name: 'Joan Wallace',
  photo: post7,
  time: timestamp(),
  items: [{
    id: 'story-9',
    length: 5,
    src: albums6,
    type: 'photo',
    link: '',
    linkText: false,
    time: timestamp()
  }]
}, {
  id: '8',
  name: 'Carolyn Ortiz',
  photo: albums5,
  time: timestamp(),
  items: [{
    id: 'story-10',
    length: 3,
    src: albums5,
    type: 'photo',
    link: '',
    linkText: false,
    time: timestamp()
  }]
}, {
  id: '9',
  name: 'Samuel Bishop',
  photo: post6,
  time: timestamp(),
  items: [{
    id: 'story-10',
    length: 5,
    src: albums6,
    type: 'photo',
    link: '',
    linkText: false,
    time: timestamp()
  }]
}, {
  id: '10',
  name: 'Carolyn Ortiz',
  photo: albums5,
  time: timestamp(),
  items: [{
    id: 'story-11',
    length: 3,
    src: albums5,
    type: 'photo',
    link: '',
    linkText: false,
    time: timestamp()
  }]
}];
const Stories = () => {
  return <div className="d-flex gap-3 mb-n3">
      <div className="position-relative text-center">
        <div className="mb-1">
          <Link className="stretched-link btn btn-dark rounded-circle icon-xxl rounded-circle" to="">
            <FaPlus className="fs-6" />
          </Link>
        </div>
        <Link to="" className="small fw-normal text-secondary">
          Post a story
        </Link>
      </div>
      <StoryComponent stories={stories} />
    </div>;
};
export default Stories;