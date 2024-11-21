import { getAllUsers } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useToggle from '@/hooks/useToggle';
import clsx from 'clsx';
import { useEffect } from 'react';
import { BsDot, BsJustifyLeft } from 'react-icons/bs';
const ContactSidebar = () => {
  const allContacts = useFetchData(getAllUsers);
  const {
    isTrue,
    toggle
  } = useToggle();
  useEffect(() => {
    isTrue ? document.body.classList.add('sidebar-end-enabled') : document.body.classList.remove('sidebar-end-enabled');
    return () => {
      document.body.classList.remove('sidebar-end-enabled');
    };
  });
  return <div className="sidebar-end p-4 bg-mode custom-scrollbar h-100">
      <div className="sidebar-end-alignment d-flex justify-content-center flex-column">
        <div className="d-flex gap-2 align-items-center">
          <a className="btn p-0 text-secondary sidebar-end-toggle d-none d-lg-flex" onClick={toggle}>
            <BsJustifyLeft className="fs-3" />
          </a>
          <h5 className="contact-title mb-0">Contacts</h5>
        </div>
        <form className="contact-search rounded position-relative">
          <input className="form-control bg-light" type="search" placeholder="Search..." aria-label="Search" />
        </form>
        <ul className="list-unstyled">
          {allContacts?.slice(0, 11).map((contact, idx) => <li className="mt-3 hstack gap-3 align-items-center position-relative toast-btn" key={idx}>
              <div className={clsx('avatar avatar-xs', {
            'avatar-story': contact.isStory
          })}>
                {contact?.avatar && <span role="button">
                    <img className="avatar-img rounded-circle" src={contact.avatar} alt="image" />
                  </span>}
              </div>
              <div className="overflow-hidden contact-name">
                <span className="h6 mb-0" role="button">
                  {contact.name}
                </span>
              </div>
              <div className="contact-status ms-auto fs-3">
                {contact.status === 'offline' ? <BsDot className="text-danger" /> : <BsDot className="text-success" />}
              </div>
            </li>)}
        </ul>
      </div>
    </div>;
};
export default ContactSidebar;