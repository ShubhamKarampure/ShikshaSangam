import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/useAuthContext';
const StyledHeader = ({
  children,
  ...restProps
}) => {
  const {user} = useAuthContext()
  const transparentPages = ['/event', '/events/details'];
  const {
    pathname
  } = useLocation();
  const classes = useMemo(() => {
    if (transparentPages.includes(pathname)) {
      return {
        header: 'navbar-transparent header-static',
        nav: 'navbar navbar-dark navbar-expand-lg'
      };
    }
    return {
      header: `navbar-light ${user.role==='college_admin'? "sticky-top":"fixed-top"} header-static bg-mode`,
      nav: 'navbar navbar-expand-lg'
    };
  }, [pathname]);
  return <header className={classes.header} {...restProps}>
      <nav className={classes.nav}>{children}</nav>
    </header>;
};
export default StyledHeader;