import React, { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import TopHeader from "@/components/layout/TopHeader";
import Sidebar from "@/components/layout/SideBar";
import Calendar from "../dashboard/components/Calendar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Box,
  Paper,
  Button,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Page() {
  const [events, setEvents] = useState([]);

  // Mock function to fetch events
  const getEvents = () => {
    setEvents([
      {
        id: 1,
        title: "Alumni Networking Event",
        date: "2024-03-15",
        description: "Connect with fellow alumni and expand your professional network.",
      },
      {
        id: 2,
        title: "Career Fair",
        date: "2024-03-22",
        description: "Explore career opportunities with top companies and recruiters.",
      },
      {
        id: 3,
        title: "Resume Building Workshop",
        date: "2024-04-05",
        description: "Learn how to craft a winning resume.",
      },{
        id: 4,
        title: "Resume Building Workshop",
        date: "2024-04-05",
        description: "Learn how to craft a winning resume.",
      },{
        id: 5,
        title: "Resume Building Workshop",
        date: "2024-04-05",
        description: "Learn how to craft a winning resume.",
      },{
        id: 6,
        title: "Resume Building Workshop",
        date: "2024-04-05",
        description: "Learn how to craft a winning resume.",
      },
    ]);
  };

  useEffect(() => {
    getEvents(); // Fetch events when the component mounts
  }, []);

  return (
    <div className="d-flex w-100">
      <Sidebar />
      <div className="d-flex flex-column w-100">
        <TopHeader />
        <Container className="py-4 d-flex" style={{ width: "80%" }}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Col className="py-4 d-flex justify-content-center align-items-start w-50">
              <Calendar />
            </Col>

            {/* Event List Section with Vertical Stepper */}
            <Col className="mt-4 ">
              <Typography variant="h5" gutterBottom>
                Upcoming Events
              </Typography>
              {events.length > 0 ? (
                <Stepper
                  orientation="vertical"
                  sx={{
                    backgroundColor: "transparent",
                    padding: 0,
                  }}
                >
                  {events.map((event, index) => (
                    <Step key={event.id} active>
                      <StepLabel>
                        <Typography variant="h6" fontWeight="bold">
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {event.date}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography>{event.description}</Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              color: "#fff",
                              borderColor: "#fff",
                              "&:hover": {
                                borderColor: "#aaa",
                              },
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              ) : (
                <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                  <Typography>No events available</Typography>
                </Paper>
              )}
            </Col>
          </ThemeProvider>
        </Container>
      </div>
    </div>
  );
}

export default Page;
