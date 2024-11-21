import { useLayoutContext } from '@/context/useLayoutContext';
const MobileMenuToggle = () => {
  const {
    mobileMenu: {
      open,
      toggle
    }
  } = useLayoutContext();
  return <button className="navbar-toggler ms-auto icon-md btn btn-light p-0" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation" aria-expanded={open} onClick={toggle}>
      <span className="navbar-toggler-animation">
        <span />
        <span />
        <span />
      </span>
    </button>;
};
export default MobileMenuToggle;