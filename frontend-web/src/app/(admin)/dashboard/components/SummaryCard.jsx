import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"; // Icon for the card

function SummaryCard({ title, value, percentage, icon }) {
  return (
    <Card
      style={{
        width: "100%",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        backgroundColor: "#111111", // Dark background
        color: "#f8fafc", // Light text
      }}
    >
      <CardContent>
        {/* Title */}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" style={{ color: "#94a3b8" }}>
            {title}
          </Typography>
          {icon ? icon : <PersonIcon style={{ color: "#94a3b8" }} />}
        </Box>

        {/* Value and percentage */}
        <Box mt={2}>
          <Typography variant="h4" fontWeight="bold" style={{ color: "#f8fafc" }}>
            {value}
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: percentage > 0 ? "#22c55e" : "#ef4444", // Green for positive, red for negative
            }}
          >
            {percentage > 0 ? `+${percentage}% from last month` : `${percentage}% from last week`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
