import avatar5 from '@/assets/images/avatar/05.jpg';
import avatar6 from '@/assets/images/avatar/06.jpg';
import avatar7 from '@/assets/images/avatar/07.jpg';
import avatar10 from '@/assets/images/avatar/10.jpg';
import avatar11 from '@/assets/images/avatar/11.jpg';
import avatar12 from '@/assets/images/avatar/12.jpg';
import { addOrSubtractMinutesFromDate } from '@/utils/date';
export const commentData = [{
  name: 'Frances Guerrero',
  avatar: avatar5,
  comment: 'Rooms oh fully taken by worse do. Points afraid but may end law lasted. Was out laughter raptures returned outweigh. Luckily cheered colonel I do we attack highest enabled.',
  likeCount: 3,
  repliesCount: 5,
  createdAt: addOrSubtractMinutesFromDate(300),
  reply: [{
    name: 'Lori Stevens',
    avatar: avatar6,
    comment: 'See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive.',
    likeCount: 5,
    createdAt: addOrSubtractMinutesFromDate(120)
  }, {
    name: 'Billy Vasquez',
    avatar: avatar7,
    comment: 'Wishing calling is warrant settled was lucky.',
    createdAt: addOrSubtractMinutesFromDate(120)
  }]
}, {
  name: 'Frances Guerrero',
  avatar: avatar10,
  comment: 'Never Give Up .Great Things Take Time.',
  likeCount: 1,
  repliesCount: 6,
  createdAt: addOrSubtractMinutesFromDate(300)
}, {
  name: 'Frances Guerrero',
  avatar: avatar11,
  comment: 'Powerful.',
  likeCount: 1,
  repliesCount: 6,
  createdAt: addOrSubtractMinutesFromDate(300)
}, {
  name: 'Frances Guerrero',
  avatar: avatar12,
  comment: 'Congratulations:)',
  likeCount: 1,
  repliesCount: 6,
  createdAt: addOrSubtractMinutesFromDate(300)
}];