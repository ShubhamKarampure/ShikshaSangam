import React, { useState } from "react";
import TextFormInput from "@/components/form/TextFormInput";
import TextAreaFormInput from "@/components/form/TextAreaFormInput";
import DateFormInput from "@/components/form/DateFormInput";
import DropzoneFormInput from "@/components/form/DropzoneFormInput";
import { BsFileEarmarkText } from "react-icons/bs";
import { Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "react-bootstrap";
import { Controller, useWatch, useForm } from "react-hook-form";
import { useNotificationContext } from "@/context/useNotificationContext";
import { createMeeting } from "@/api/meet";
import { createEvent } from "@/api/events";

function CreateEventForm({ isOpen, toggle }) {
  const { control, handleSubmit, setValue } = useForm();
  const mode = useWatch({ control, name: "mode", defaultValue: "online" });
  const { showNotification } = useNotificationContext();
  const VIDEOSDK_TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN;
  const [disable, setDisable] = useState(false);
  const [files, setFiles] = useState(null);
  const handleMeetCreation = async () => {
    try {
      const response = await createMeeting({ token: VIDEOSDK_TOKEN });
      if (response?.meetingId) {
        setValue("online_meet_id", response.meetingId);
        setDisable(true);
        showNotification("success", "Meeting link created successfully!");
      } else {
        throw new Error(response?.err || "Failed to create meeting");
      }
    } catch (error) {
      console.error(error.message);
      showNotification("error", "Failed to create meeting link.");
    }
  };

  const onSubmit = async(data) => {
    console.log("Form Data:", data);
    const newFormData=new FormData();
    newFormData.append("name",data.title);
    newFormData.append("mode",data.mode);
    newFormData.append("online_meet_id",data.online_meet_id);
    newFormData.append("description",data.description);
    if(files){
      newFormData.append("poster",files[0]);
    }
    const response=await createEvent(newFormData);
    if(response){
      showNotification({
        message: "Event created successfully!",
        variant: "success",
      });
      toggle();
    }
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader closeButton>
          <h5 className="modal-title" id="modalLabelCreateEvents">
            Create Event
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
                options={{ enableTime: false }}
                type="text"
                className="form-control"
                placeholder="Select date"
              />
            </Col>
            <Col sm={4}>
              <label className="form-label">Time</label>
              <DateFormInput
                options={{ enableTime: true, noCalendar: true }}
                type="text"
                className="form-control"
                placeholder="Select time"
              />
            </Col>
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

            {/* Conditional Fields */}
            {mode === "offline" && (
              <TextFormInput
                name="location"
                label="Location"
                placeholder="Event location here"
                containerClassName="col-12"
                control={control}
              />
            )}
            {mode === "online" && (
              <Button onClick={handleMeetCreation} disabled={disable}>
                {disable ? "Meet Link Created" : "Create Meet Link"}
              </Button>
            )}

            <TextFormInput
              name="speakers"
              type="email"
              label="Add Speakers"
              placeholder="Speaker email"
              containerClassName="col-12"
              control={control}
            />
            <DropzoneFormInput
              showPreview
              helpText="Drop Banner Image here or click to upload."
              icon={BsFileEarmarkText}
              label="Upload Banner"
              containerClassName="mb-3"
              onFileUpload={(file) => setFiles(file)}
            />
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
            Create Now
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default CreateEventForm;
