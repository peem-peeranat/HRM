"use client"
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeaveForm from './LeaveForm';
import { fetchReasonOptions, submitLeave } from './leaveApi';

function LeaveContent() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);
  const [reasonOptions, setReasonOptions] = useState([]);

  useEffect(() => {
    fetchReasonOptions(setReasonOptions);
  }, []);

  const handleSubmit = async () => {
    await submitLeave({ startDate, endDate, reason, note, file, setStartDate, setEndDate, setReason, setNote, setFile });
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        ยื่นใบลา
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          mt: 2,
          p: 3,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: 'transparent',
        }}
      >
        <Grid container spacing={2}>
          <LeaveForm
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            reason={reason}
            setReason={setReason}
            note={note}
            setNote={setNote}
            file={file}
            setFile={setFile}
            reasonOptions={reasonOptions}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default LeaveContent;