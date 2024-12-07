import React from "react";
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import DateFormInput from '@/components/form/DateFormInput';
import DropzoneFormInput from '@/components/form/DropzoneFormInput';
import {  BsFileEarmarkText } from 'react-icons/bs';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row,  } from 'react-bootstrap';
function CreateEventForm({isOpen, toggle,control,handleSubmit,guests}) {
  return (
    <Modal
      show={isOpen}
      onHide={toggle}
      centered
      className="fade"
      id="modalCreateEvents"
      tabIndex={-1}
      aria-labelledby="modalLabelCreateEvents"
      aria-hidden="true"
    >
      <form onSubmit={handleSubmit(() => {})}>
        <ModalHeader closeButton>
          <h5 className="modal-title" id="modalLabelCreateEvents">
            Create event
          </h5>
        </ModalHeader>
        <ModalBody>
          <Row className="g-4">
            <TextFormInput
              name="title"
              label="Title"
              placeholder="Event name here"
              containerClassName="col-12"
              control={control}
            />
            <TextAreaFormInput
              name="description"
              label="Description"
              rows={2}
              placeholder="Ex: topics, schedule, etc."
              containerClassName="col-12"
              control={control}
            />

            <Col sm={4}>
              <label className="form-label">Date</label>
              <DateFormInput
                options={{
                  enableTime: false,
                }}
                type="text"
                className="form-control"
                placeholder="Select date"
              />
            </Col>
            <div className="col-sm-4">
              <label className="form-label">Time</label>
              <DateFormInput
                options={{
                  enableTime: true,
                  noCalendar: true,
                }}
                type="text"
                className="form-control"
                placeholder="Select time"
              />
            </div>
            <TextFormInput
              name="duration"
              label="Duration"
              placeholder="1hr 23m"
              containerClassName="col-sm-4"
              control={control}
            />
            <TextFormInput
              name="location"
              label="Location"
              placeholder="Logansport, IN 46947"
              containerClassName="col-12"
              control={control}
            />
            <TextFormInput
              name="guest"
              type="email"
              label="Add guests"
              placeholder="Guest email"
              containerClassName="col-12"
              control={control}
            />
            <Col xs={12} className="mt-3">
              <ul className="avatar-group list-unstyled align-items-center mb-0">
                {guests.map((avatar, idx) => (
                  <li className="avatar avatar-xs" key={idx}>
                    <img
                      className="avatar-img rounded-circle"
                      src={avatar}
                      alt="avatar"
                    />
                  </li>
                ))}
                <li className="ms-3">
                  <small> +50 </small>
                </li>
              </ul>
            </Col>
            <div className="mb-3">
              <DropzoneFormInput
                showPreview
                helpText="Drop presentation and document here or click to upload."
                icon={BsFileEarmarkText}
                label="Upload attachment"
              />
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="danger-soft"
            type="button"
            className="me-2"
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button variant="success-soft" type="submit">
            Create now
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default CreateEventForm;
