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

const FileUploadComponent = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle file upload
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`, // Convert size to MB
      date: new Date().toLocaleDateString(),
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Filter uploaded files based on the search query
  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="py-4 text-light">
      {/* Header */}
      <h2 className="mb-4">Upload Alumni Data</h2>

      {/* Drag-and-Drop Upload Section */}
      <Row className="mb-4">
        <Col>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #7b5dfb",
              borderRadius: "16px", // Rounded border
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
            <p>Supported Format: SVG, JPG, PNG (10MB each)</p>
          </div>
        </Col>
      </Row>

      {/* Search and Filter Toolbar */}

      <div
        className="p-4 text-white rounded shadow"
        style={{
          border: "2px solid #2A2B30", 
          boxShadow: "0 4px 8px rgba(123, 93, 251, 0.4)",
          color: "#FFFFFF",
        }}
      >
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search files..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Button variant="primary" className="w-100">
              Filter
            </Button>
          </Col>
          <Col md={3} className="text-end">
            <strong>{uploadedFiles.length} Attached Files</strong>
          </Col>
        </Row>

        {/* Uploaded Files Table */}
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
