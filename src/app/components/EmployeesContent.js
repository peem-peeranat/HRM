"use client"
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar"; // เพิ่ม Avatar
import PhoneIcon from "@mui/icons-material/Phone"; // เพิ่มไอคอน
import EmailIcon from "@mui/icons-material/Email"; // เพิ่มไอคอน
import PersonIcon from "@mui/icons-material/Person"; // เพิ่มไอคอน

function EmployeesContent() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const apiUrl = "http://localhost:1337/api/users";
        const token = Cookies.get("token");
        if (!token) {
          setError("Unauthorized: No token found in cookies");
          return;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setUsers(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Users List
      </Typography>
      {error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : users.length > 0 ? (
        <Grid container spacing={3} sx={{ maxWidth: 1200, width: "100%" }}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar
                    src={user.profile || "defaultProfilePic.png"}
                    alt="Profile"
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                      border: "2px solid #e0e0e0",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Typography variant="h6" color="primary">
                    {user.username}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                      color: "text.secondary",
                    }}
                  >
                    <EmailIcon fontSize="small" />
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                      color: "text.secondary",
                    }}
                  >
                    <PersonIcon fontSize="small" />
                    <Typography variant="body2">
                      {user.fullName || "N/A"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                      color: "text.secondary",
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                    <Typography variant="body2">
                      0{user.phone || "N/A"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}

export default EmployeesContent;



