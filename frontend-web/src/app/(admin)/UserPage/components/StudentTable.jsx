import React, { useState } from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function StudentTable({ students }) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = students.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
      <div className="d-flex gap-3 justify-content-between px-5 pt-3 align-items-center">
        <h2 className="mb-0">Students</h2>
        <div className="d-flex gap-3 align-items-center">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              minWidth: 250,
              "& .MuiOutlinedInput-root": {
                borderRadius: 20, // Makes the search bar rounded
              },
            }}
          />
          <Button variant="outlined" onClick={() => navigate("/admin/upload")}>
            Add Bulk
          </Button>
        </div>
      </div>
      <CardContent>
        {filteredUsers && filteredUsers.length > 0 ? (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Role
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Enrollment Year
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Current Program
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Specialization
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="left">
                      <Link to={`/profile/feed/${user.profile}`}>
                        {user.name || "User"}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      {user.email || "123@123.com"}
                    </TableCell>
                    <TableCell align="left">Student</TableCell>
                    <TableCell align="left">
                      {user.enrollment_year || "2022"}
                    </TableCell>
                    <TableCell align="left">
                      {user.current_program || "CSE"}
                    </TableCell>
                    <TableCell align="center">
                      {/* <IconButton
                        color="success"
                        onClick={() => handleApprove(user.id)}
                      >
                        <FaCheck size={15} />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() =>
                          console.log(`Deleted user with ID: ${user.id}`)
                        }
                      >
                        <FaTimes size={15} />
                      </IconButton> */}
                      {user.specialization || "Data Science"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            No users matching your search.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default StudentTable;
