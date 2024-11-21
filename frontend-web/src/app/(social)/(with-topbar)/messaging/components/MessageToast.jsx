import { useChatContext } from '@/context/useChatContext';
import { Button, Toast, ToastBody, ToastHeader } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { FaFaceSmile } from 'react-icons/fa6';
const MessageToast = () => {
  const {
    chatToast
  } = useChatContext();
  return <>
      <div className="dropend position-relative" onClick={chatToast.toggle}>
        <div className="nav">
          <div role="button" className="icon-md rounded-circle btn btn-sm btn-primary-soft nav-link toast-btn" data-target="chatToast">
            
            <BsPencilSquare />
          </div>
        </div>
      </div>
      <div className="position-fixed bottom-0 end-0 p-3 z-3">
        <Toast show={chatToast.open} onClose={chatToast.toggle} id="chatToast" className="bg-mode" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
          <ToastHeader className="bg-mode d-flex justify-content-between">
            <h6 className="mb-0">New message</h6>
          </ToastHeader>
          <ToastBody id="collapseChat">
            <form>
              <div className="input-group mb-3">
                <span className="input-group-text border-0">To</span>
                <input className="form-control" type="text" placeholder="Type a name or multiple names" />
              </div>
            </form>
            <div className="h-200px" />
            <div className="d-sm-flex align-items-end">
              <textarea className="form-control mb-sm-0 mb-3" placeholder="Type a message" rows={1} spellCheck="false" defaultValue={''} />
              <Button variant="danger-soft" size="sm" className="ms-sm-2">
                <FaFaceSmile className="fs-6" />
              </Button>
              <Button variant="secondary-soft" size="sm" className="ms-2">
                <FaPaperclip className="fs-6" />
              </Button>
              <Button variant="primary" size="sm" className="ms-2">
                <FaPaperPlane className="fs-6" />
              </Button>
            </div>
          </ToastBody>
        </Toast>
      </div>
    </>;
};
export default MessageToast;