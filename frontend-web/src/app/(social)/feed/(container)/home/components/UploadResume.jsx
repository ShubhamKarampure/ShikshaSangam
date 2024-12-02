import React, { useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist/webpack"; // Import pdf.js

const UploadResume = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfPreview, setPdfPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Clear previous errors
    setErrorMessage("");
    setPdfPreview(null); // Reset the preview

    // Filter out files that are not PDFs
    const pdfFiles = acceptedFiles.filter(
      (file) => file.type === "application/pdf" || file.name.endsWith(".pdf")
    );

    // Set error message for rejected files
    if (rejectedFiles.length > 0 || pdfFiles.length < acceptedFiles.length) {
      setErrorMessage("Only PDF files are supported.");
    }

    // Process accepted PDF files
    const newFiles = pdfFiles.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      date: new Date().toLocaleDateString(),
      file, // Save the file for previewing
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Preview the first page of the PDF
    const file = pdfFiles[0]; // Assuming only one file is dropped
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const page = await pdf.getPage(1); // Get the first page

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const viewport = page.getViewport({ scale: 0.5 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      // Set the preview image (top header of the first page)
      setPdfPreview(canvas.toDataURL());
    };

    fileReader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="text-light mb-3">
      <div
        {...getRootProps()}
        style={{
          justifyContent: "center",
          border: "2px dashed #7b5dfb", // Blue border
          borderRadius: "8px",
          padding: "10px",
          textAlign: "center",
          color: isDragActive ? "#BABBB3" : "#BABBB3",
          transition: "background-color 0.3s, color 0.3s",
              }}
              
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p  style={{ marginBottom: "0" }}>
            <strong>
              <a href="#" style={{ color: "#7b5dfb", textDecoration: "none" }}>
                Upload resume
              </a>
            </strong>{" "}
           
          </p>
        )}
      </div>

      {/* Render the PDF preview */}
      {pdfPreview && (
        <div className="mt-4 text-center">
          <h5>Preview of the uploaded PDF</h5>
          <img src={pdfPreview} alt="PDF Preview" style={{ width: "100%", maxWidth: "600px" }} />
        </div>
      )}
    </Container>
  );
};

export default UploadResume;
