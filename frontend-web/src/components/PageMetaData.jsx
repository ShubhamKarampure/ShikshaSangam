import { DEFAULT_PAGE_TITLE } from '@/context/constants';
import { Helmet } from 'react-helmet-async';
const PageMetaData = ({
  title
}) => {
  const defaultTitle = DEFAULT_PAGE_TITLE;
  return <Helmet>
      <title>{title ? title + ' | ' + defaultTitle : defaultTitle}</title>
    </Helmet>;
};
export default PageMetaData;