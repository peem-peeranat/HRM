import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress,
  useTheme, useMediaQuery
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeaveTable from './LeaveTable';

function LeavereportContent() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    fetch("http://localhost:1337/api/leaves?populate=*")
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          setLeaves(data.data);
        }
      })
      .catch(error => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const updateLeaveStatus = async (documentId, status) => {
    try {
      const response = await fetch(`http://localhost:1337/api/leaves/${documentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { leaveStatus: status } }),
      });

      if (!response.ok) throw new Error("Failed to update leave status");

      setLeaves(prevLeaves => prevLeaves.filter(leave => leave.documentId !== documentId));
      toast.success(`สถานะอัปเดตเป็น "${status}"`);
    } catch (error) {
      console.error("Error updating leave status:", error);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <Box sx={{ py: 4, px: 2, bgcolor: 'transparent', color: theme.palette.text.primary }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'left', fontWeight: 'bold', color: theme.palette.primary.main }}>
        Leave Report
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <LeaveTable leaves={leaves} updateLeaveStatus={updateLeaveStatus} theme={theme} />
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
}

export default LeavereportContent;