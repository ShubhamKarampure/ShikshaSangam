import Preloader from "@/components/Preloader";
import { lazy, Suspense } from "react";
const TopHeader = lazy(() => import("@/components/layout/TopHeader"));
const SocialLayout = ({
  children
}) => {
  return <>
      <Suspense>
        <TopHeader />
      </Suspense>

      <Suspense fallback={<Preloader />}>
        {children}
      </Suspense>
    </>;
};
export default SocialLayout;