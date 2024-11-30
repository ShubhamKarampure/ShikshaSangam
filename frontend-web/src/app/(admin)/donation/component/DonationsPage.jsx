import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Box,
  CircularProgress,
  TableContainer,
  CardMedia,
  LinearProgress
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import SummaryCard from "../../dashboard/components/SummaryCard";
import { Col, Row } from "react-bootstrap";

const mockData = {
  totalDonations: "$50,000",
  numberOfDonors: 120,
  researchProjects: 8,
  donations: [
    { name: "Alice Johnson", amount: "$500", note: "For cancer research" },
    { name: "Bob Smith", amount: "$100", note: "Keep up the great work!" },
    { name: "Carol Lee", amount: "$1,000", note: "" },
  ],
  researchProjectsDetails: [
    {
      title: "AI in Medicine",
      description: "Using AI to diagnose diseases early.",
      fundingProgress: 75,
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Renewable Energy",
      description: "Innovations in solar power technology.",
      fundingProgress: 60,
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Space Exploration",
      description: "Advanced rockets for deep space missions.",
      fundingProgress: 90,
      image: "https://via.placeholder.com/150",
    },
  ],
};

const DonationsPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {/* Header Section */}

        <Box sx={{ p: 3 }}>
          {/* Subtitle */}
          <Typography variant="h4" gutterBottom>
            Supporting groundbreaking research and innovation
          </Typography>

          {/* Statistics Section */}
          <Row className="mb-4">
            <Col>
              <SummaryCard
                title={"Total Donations"}
                value={mockData.totalDonations}
                percentage={1}
              />
            </Col>
            <Col>
              <SummaryCard
                title={"Number of donor"}
                value={mockData.numberOfDonors}
                percentage={3}
              />
            </Col>
            <Col>
              <SummaryCard
                title={"Ongoing Projects"}
                value={mockData.researchProjects}
                percentage={-3}
              />
            </Col>
          </Row>

          {/* Donations List Section */}
          <Card sx={{ mt: 5, p: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Recent Donations
            </Typography>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Donor Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.donations.map((donation, index) => (
                    <TableRow key={index}>
                      <TableCell>{donation.name}</TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell>{donation.note || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Highlighted Research Section */}
          <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Highlighted Research Projects
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {mockData.researchProjectsDetails.map((project, index) => (
              <Card
                key={index}
                sx={{
                  width: "320px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                {/* Project Image */}
                <CardMedia
                  component="img"
                  height="150"
                  image={project.image}
                  alt={project.title}
                  sx={{ objectFit: "cover" }}
                />
                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                  {/* Funding Progress */}
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Funding Progress:
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={project.fundingProgress}
                      sx={{
                        height: 8,
                        borderRadius: 2,
                        backgroundColor: "grey.300",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }} align="right">
                      {project.fundingProgress}%
                    </Typography>
                  </Box>
                </CardContent>
                {/* Call to Action */}
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Button variant="contained" size="small" color="primary">
                    Learn More
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Call-to-Action Section */}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DonationsPage;
