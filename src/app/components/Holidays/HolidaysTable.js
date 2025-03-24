import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { formatDate, getDaysUntil } from './holidaysUtils';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

function HolidaysTable({ holidays }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 320 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              style={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Date
            </TableCell>
            <TableCell
              align="center"
              style={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Holiday
            </TableCell>
            <TableCell
              align="center"
              style={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Days Left
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holidays.map((holiday) => (
            <StyledTableRow key={holiday.id}>
              <TableCell
                align="center"
                style={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                {formatDate(holiday.date)}
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                {holiday.title}
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <AccessTimeIcon sx={{ mr: 1, color: "#f57c00" }} />
                  {getDaysUntil(holiday.date)}
                </Box>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HolidaysTable;