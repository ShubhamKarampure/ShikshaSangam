import Preloader from '@/components/Preloader';
import { Suspense } from 'react';
const OtherLayout = ({
  children
}) => {
  return <Suspense fallback={<Preloader />}>{children}</Suspense>;
};
export default OtherLayout;