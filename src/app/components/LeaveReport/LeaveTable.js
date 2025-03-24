import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';

const LeaveTable = ({ leaves, updateLeaveStatus, theme }) => (
  <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, bgcolor: 'transparent' }}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: theme.palette.grey[900] }}>
          {['Start Date', 'End Date', 'Note', 'Leave Status', 'Reason', 'Username', 'Email', 'File', 'Actions'].map(header => (
            <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {leaves
          .filter(leave => leave.leaveStatus === 'Pending Approval')
          .map(leave => (
            <TableRow key={leave.documentId} hover sx={{ bgcolor: theme.palette.grey[800] }}>
              <TableCell sx={{ color: 'white' }}>{leave.startDate}</TableCell>
              <TableCell sx={{ color: 'white' }}>{leave.endDate}</TableCell>
              <TableCell sx={{ color: 'white' }}>{leave.note || 'N/A'}</TableCell>
              <TableCell sx={{ color: 'white' }}>{leave.leaveStatus || 'Pending'}</TableCell>
              <TableCell sx={{ color: 'white' }}>{leave.reason}</TableCell>
              <TableCell sx={{ color: 'white' }}>{leave.users_permissions_user?.username}</TableCell>
              <TableCell sx={{ color: 'white' }}>{leave.users_permissions_user?.email}</TableCell>
              <TableCell sx={{ color: 'white' }}>{leave.file ? leave.file : 'No file attached'}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" sx={{ mr: 1 }}
                  onClick={() => updateLeaveStatus(leave.documentId, "Approved")}
                >
                  อนุมัติ
                </Button>
                <Button variant="contained" color="error"
                  onClick={() => updateLeaveStatus(leave.documentId, "Not Approved")}
                >
                  ไม่อนุมัติ
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default LeaveTable;