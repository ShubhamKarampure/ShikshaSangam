import React, { useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { uploadRes } from "@/api/uploadRes";
import { useAuthContext } from "@/context/useAuthContext";
import { useNotificationContext } from "@/context/useNotificationContext";

const UploadResume = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuthContext();
  const { showNotification } = useNotificationContext();

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    // Clear previous errors
    setErrorMessage("");

    // Filter valid PDF files
    const pdfFiles = acceptedFiles.filter(
      (file) => file.type === "application/pdf" || file.name.endsWith(".pdf")
    );

    // Set error message if any rejected files are present
    if (rejectedFiles.length > 0 || pdfFiles.length < acceptedFiles.length) {
      setErrorMessage("Only PDF files are supported.");
    }

    // Process accepted files
    const newFiles = pdfFiles.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      date: new Date().toLocaleDateString(),
      file, // Save the file object for upload
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    try {
      const res = await uploadRes(pdfFiles, user.profile_id);
      if (res) {
        showNotification({
          message: "Resume uploaded successfully!",
          variant: "success",
        });
      } else {
        console.error("Error during upload:", res);
        showNotification({
          message: "Error uploading resume. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Upload failed:", error.message);
      showNotification({
        message: "An unexpected error occurred. Please try again later.",
        variant: "error",
      });
    }
  }, [user.profile_id, showNotification]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Container fluid className="text-light mb-3">
      <div
        {...getRootProps()}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px dashed #7b5dfb", // Blue border
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          color: isDragActive ? "#7b5dfb" : "#BABBB3",
          transition: "background-color 0.3s, color 0.3s",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p style={{ marginBottom: "0" }}>
            <strong>
              <a href="#" style={{ color: "#7b5dfb", textDecoration: "none" }}>
                Upload your resume
              </a>
            </strong>
          </p>
        )}
      </div>

      {/* Display Error Message */}
      {errorMessage && (
        <div className="text-danger mt-2 text-center">{errorMessage}</div>
      )}

      {/* Display Uploaded Files */}
      {/* {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h5 className="text-light">Uploaded Resumes</h5>
          <ul className="list-group">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="list-group-item bg-dark text-light">
                <strong>{file.name}</strong> - {file.size} - Uploaded on{" "}
                {file.date}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </Container>
  );
};

export default UploadResume;
