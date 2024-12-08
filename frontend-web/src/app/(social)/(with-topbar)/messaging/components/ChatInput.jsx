import React, { useState } from "react";
import { Box, IconButton, TextareaAutosize } from "@mui/material";

const ChatInput = ({
  inputValue,
  handleInputChange,
  inputColor,
  error,
  field,
  onKeyDown,
}) => {
  const handleChange = (e) => {
    // Handle your custom input change logic
    field.onChange(e);
    console.log("Input value:", e.target.value);

    handleInputChange(e);
  };

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          maxHeight: "150px", // Limit height for scrollbar to appear
          overflowY: "auto", // Enable vertical scrolling
          borderRadius: "8px",
          border: "1px solid #ccc",
          "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: "#F5F5F5",
          },
          "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            backgroundColor: "#F5F5F5",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            "-webkit-box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.3)",
            backgroundColor: "#555",
          },
        }}
      >
        <TextareaAutosize
          value={inputValue}
          onChange={handleChange}
          minRows={1}
          placeholder="Type a message or @writebot 'Prompt'"
          style={{
            height: "30px",
            width: "100%",
            resize: "none",
            border: "none",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "transparent",
            color: inputColor,
          }}
          onKeyDown={onKeyDown}
          className={`form-control ${error ? "is-invalid" : ""}`}
        />
      </Box>
    </Box>
  );
};

export default ChatInput;
