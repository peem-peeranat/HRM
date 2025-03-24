"use client"
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchHolidays } from './holidaysApi';
import { filterHolidays } from './holidaysUtils';
import HolidaysTable from './HolidaysTable';

function HolidaysContent() {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  useEffect(() => {
    fetchHolidays(setHolidays, setError);
  }, []);

  const handleRefresh = () => {
    setSearchTerm("");
    setFilterDate(null);
  };

  const filteredHolidays = filterHolidays(holidays, searchTerm, filterDate);

  return (
    <Container maxWidth="lg">
      <Box p={3}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Public Holidays
        </Typography>
        <Grid container spacing={2} justifyContent="center" mb={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Holiday"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%' }}>
              <DatePicker
                fullWidth
                label="Filter by Date"
                value={filterDate}
                onChange={(newValue) => setFilterDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ width: '100%' }} />}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="right"
            alignItems="center"
          >
            <IconButton onClick={handleRefresh} aria-label="refresh">
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>
        {error ? (
          <Typography color="error" align="center">
            Error: {error}
          </Typography>
        ) : filteredHolidays.length > 0 ? (
          <HolidaysTable holidays={filteredHolidays} />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt={3}
          >
            {holidays.length === 0 && !error ? (
              <CircularProgress />
            ) : (
              <Typography variant="body1" color="textSecondary">
                No holidays found matching your criteria.
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default HolidaysContent;