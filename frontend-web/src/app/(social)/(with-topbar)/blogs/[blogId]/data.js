import { addOrSubtractDaysFromDate } from '@/utils/date';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
export const commentsData = [{
  name: 'Allen Smith',
  avatar: avatar4,
  createdAt: addOrSubtractDaysFromDate(25),
  comment: 'Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if.',
  reply: [{
    name: 'Allen Smith',
    avatar: avatar4,
    createdAt: addOrSubtractDaysFromDate(18),
    comment: 'Meant balls it if up doubt small purse.'
  }]
}, {
  name: 'Frances Guerrero',
  avatar: avatar3,
  createdAt: addOrSubtractDaysFromDate(12),
  comment: 'Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked.'
}];