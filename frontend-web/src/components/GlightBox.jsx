import glightbox from 'glightbox';
import { useEffect, useRef } from 'react';
import 'glightbox/dist/css/glightbox.min.css';
const GlightBox = ({
  children,
  href,
  ...other
}) => {
  const ref = useRef(null);
  useEffect(() => {
    let instance = null;
    if (ref.current) {
      instance = glightbox({
        openEffect: 'fade',
        closeEffect: 'fade'
      });
    }
    return () => instance?.destroy();
  }, [ref]);
  return <a ref={ref} href={href} {...other} className={`glightbox ${other['className']}`}>
      {children}
    </a>;
};
export default GlightBox;