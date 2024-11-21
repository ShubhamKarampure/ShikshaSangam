import { addOrSubtractMinutesFromDate } from '@/utils/date';
import logo12 from '@/assets/images/logo/12.svg';
import { Link } from 'react-router-dom';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar7 from '@/assets/images/avatar/07.jpg';
import logo8 from '@/assets/images/logo/08.svg';
export const notificationData = [{
  id: '151',
  title: 'Judy Nguyen sent you a friend request.',
  avatar: avatar1,
  time: addOrSubtractMinutesFromDate(1),
  isFriendRequest: true
}, {
  id: '152',
  title: 'Wish Amanda Reed a happy birthday (Nov 12)',
  description: <button className="btn btn-sm btn-outline-light py-1 mt-1 me-2">Say happy birthday 🎂</button>,
  avatar: avatar2,
  time: addOrSubtractMinutesFromDate(1)
}, {
  id: '153',
  title: ' Webestica has 15 like and 1 new activity',
  textAvatar: {
    text: 'WB',
    variant: 'success'
  },
  time: addOrSubtractMinutesFromDate(2),
  isRead: true
}, {
  id: '154',
  title: 'Bootstrap in the news:  The search giant’s parent company, Alphabet, just joined an exclusive club of tech stocks.',
  avatar: logo12,
  time: addOrSubtractMinutesFromDate(8),
  isRead: true
}, {
  id: '155',
  title: 'You have a Connection!',
  description: <p className="small">
        <Link to=""> @Samuel Bishop</Link> joined project Blogzine blog theme
      </p>,
  avatar: avatar3,
  time: addOrSubtractMinutesFromDate(20)
}, {
  id: '156',
  title: 'You have a Payout!',
  description: <p className="small mb-0">Webestica LLC has sent you $1205 USD</p>,
  avatar: avatar4,
  time: addOrSubtractMinutesFromDate(180)
}, {
  id: '157',
  title: 'Order cancelled: #23685',
  description: <>
        <p className="small mb-0">Order #23685 belonging to Amanda Reed has been cancelled</p>
        <a className="btn btn-link btn-sm" href="#!">
          
          <u> Review order </u>
        </a>
      </>,
  avatar: logo8,
  time: addOrSubtractMinutesFromDate(300)
}, {
  id: '158',
  title: 'Order cancelled: #23685',
  description: <p className="small mb-0">Webestica LLC has sent you $1205 USD</p>,
  avatar: avatar4,
  time: addOrSubtractMinutesFromDate(180),
  isRead: true
}, {
  id: '159',
  title: 'Order cancelled: #23685',
  description: <>
        <p className="small mb-0">Order #23685 belonging to Amanda Reed has been cancelled</p>
        <a className="btn btn-link btn-sm" href="#!">
          
          <u> Say congrats </u>
        </a>
      </>,
  avatar: avatar7,
  time: addOrSubtractMinutesFromDate(300),
  isRead: true
}];