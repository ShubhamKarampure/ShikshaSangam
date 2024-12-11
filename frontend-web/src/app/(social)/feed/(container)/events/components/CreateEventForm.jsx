import React from "react";
import TextFormInput from "@/components/form/TextFormInput";
import TextAreaFormInput from "@/components/form/TextAreaFormInput";
import DateFormInput from "@/components/form/DateFormInput";
import DropzoneFormInput from "@/components/form/DropzoneFormInput";
import { BsFileEarmarkText } from "react-icons/bs";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "react-bootstrap";
import { Controller, useWatch } from "react-hook-form";
import { useNotificationContext } from "@/context/useNotificationContext";
import {createMeeting} from "@/api/meet"

function CreateEventForm({ isOpen, toggle, control, handleSubmit }) {
  // Watch the value of 'mode' to conditionally render the location field
  const mode = useWatch({ control, name: "mode", defaultValue: "online" });
  const { showNotification } = useNotificationContext();
  const VIDEOSDK_TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN;
  const handleMeetCreation=async()=>{
    const response=await createMeeting(VIDEOSDK_TOKEN)
    if(response){
      console.log(response)
    }
  }
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

            {/* Mode Selection */}
            <Controller
              name="mode"
              control={control}
              defaultValue="online"
              render={({ field }) => (
                <Col sm={6}>
                  <label className="form-label">Mode</label>
                  <select {...field} className="form-select">
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </Col>
              )}
            />

            {/* Conditional Location Field */}
            {mode === "offline" && (
              <TextFormInput
                name="location"
                label="Location"
                placeholder="Event location here"
                containerClassName="col-12"
                control={control}
              />
            )}
            {mode ==='online' &&(
              <Button onClick={handleMeetCreation}>
                Create Meet link
              </Button>  
            )}

            <TextFormInput
              name="Speakers"
              type="email"
              label="Add Speakers"
              placeholder="Speaker email"
              containerClassName="col-12"
              control={control}
            />
            <div className="mb-3">
              <DropzoneFormInput
                showPreview
                helpText="Drop Banner Image here or click to upload."
                icon={BsFileEarmarkText}
                label="Upload Banner"
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
