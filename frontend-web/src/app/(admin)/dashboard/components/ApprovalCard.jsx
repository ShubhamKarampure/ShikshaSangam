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
import { useNavigate } from "react-router-dom";

const ApprovalCard = ({ users, handleApprove }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
      <div className="d-flex gap-3 justify-content-between px-5 pt-3 align-items-center">
        <h2 className="mb-0">Users</h2>
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
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/upload")}
          >
            Add Bulk
          </Button>
        </div>
      </div>
      <CardContent>
        {filteredUsers && filteredUsers.length > 0 ? (
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
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
                    Year
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">
                      {user.email || "123@123.com"}
                    </TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">{user.year || "2024"}</TableCell>
                    <TableCell align="left">{user.status}</TableCell>
                    <TableCell align="center">
                      <IconButton
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
                      </IconButton>
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
};

export default ApprovalCard;
