import { addOrSubtractMinutesFromDate } from '@/utils/date';
import avatar7 from '@/assets/images/avatar/07.jpg';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
export const activityData = [{
  title: 'Sam Lanson update a playlist on webestica.',
  avatar: avatar7,
  time: addOrSubtractMinutesFromDate(1),
  type: 'Public'
}, {
  title: 'Billy Vasquez save a link.',
  time: addOrSubtractMinutesFromDate(2),
  type: 'only me',
  avatar: avatar1
}, {
  title: "Sam Lanson liked Frances Guerrero's add comment.",
  time: addOrSubtractMinutesFromDate(60),
  description: <div className="mb-0 small">This is the best picture I have come across today....</div>,
  textAvatar: {
    text: 'SM',
    variant: 'success'
  }
}, {
  title: 'Judy Nguyen likes Jacqueline Miller Photos.',
  time: addOrSubtractMinutesFromDate(240),
  description: '✌️👌👍',
  avatar: avatar2
}, {
  title: 'Larry Lawson',
  time: addOrSubtractMinutesFromDate(600),
  description: <>
        <p className="small mb-2">Replied to your comment on Blogzine blog theme</p>
        <small className="bg-light rounded p-2 d-block">Yes, I am so excited to see it live. 👍</small>
      </>,
  avatar: avatar3
}];