import React, { useCallback, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { uploadCSV } from "@/api/uploadcsv";

const FileUploadComponent = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Clear previous errors
    setErrorMessage("");

    // Filter out files that are not CSV
    const csvFiles = acceptedFiles.filter(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv")
    );

    // Set error message for rejected files
    if (rejectedFiles.length > 0 || csvFiles.length < acceptedFiles.length) {
      setErrorMessage("Only CSV files are supported.");
    }

    // Process accepted CSV files
    uploadCSV(acceptedFiles)
    const newFiles = csvFiles.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      date: new Date().toLocaleDateString(),
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="py-4 text-light">
      <h2 className="mb-4">Upload Alumni Data</h2>

      <Row className="mb-4">
        <Col>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #7b5dfb",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
              backgroundColor: isDragActive ? "#7b5dfb" : "#2A2B30",
              color: isDragActive ? "#fff" : "#BABBB3",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>
                <strong>
                  <a
                    href="#"
                    style={{ color: "#7b5dfb", textDecoration: "none" }}
                  >
                    Click here
                  </a>
                </strong>{" "}
                to upload your file or drag files here.
              </p>
            )}
            <p>Supported Format: CSV (10MB each)</p>
          </div>
          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
        </Col>
      </Row>

      <div
        className="p-4 text-white rounded shadow"
        style={{
          border: "2px solid #2A2B30",
          boxShadow: "0 4px 8px rgba(123, 93, 251, 0.4)",
          color: "#FFFFFF",
        }}
      >
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <strong>{uploadedFiles.length} Attached Files</strong>
          </Col>
          <Col md={6}>
            <InputGroup style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
              <Form.Control
                type="text"
                placeholder="Search files..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  borderRadius: "8px",
                  padding: "10px 15px",
                  border: "1px solid #7b5dfb",
                  backgroundColor: "#2A2B30",
                  color: "#fff",
                }}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Button
              variant="primary"
              className="w-100"
              style={{
                background: "linear-gradient(90deg, #7b5dfb, #5c44e9)",
                border: "none",
                borderRadius: "8px",
                padding: "10px 15px",
                boxShadow: "0 4px 8px rgba(123, 93, 251, 0.4)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Filter
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            {filteredFiles.length > 0 ? (
              <Table hover responsive className="text-light">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>File Size</th>
                    <th>Date Uploaded</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                      <td>{file.size}</td>
                      <td>{file.date}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            setUploadedFiles((prevFiles) =>
                              prevFiles.filter((_, i) => i !== index)
                            )
                          }
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default FileUploadComponent;

