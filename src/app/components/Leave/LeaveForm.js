import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function LeaveForm({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  reason,
  setReason,
  note,
  setNote,
  file,
  setFile,
  reasonOptions,
  handleSubmit,
}) {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          label="วันที่เริ่มต้น *"
          type="date"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="วันที่สิ้นสุด *"
          type="date"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="reason-label">เหตุผลการลา *</InputLabel>
          <Select
            labelId="reason-label"
            id="reason-select"
            value={reason}
            label="เหตุผลการลา *"
            onChange={(e) => setReason(e.target.value)}
          >
            {reasonOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="หมายเหตุ"
          multiline
          rows={4}
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          fullWidth
        >
          แนบไฟล์
          <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
        </Button>
        {file && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {file.name}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          ยื่นใบลา
        </Button>
      </Grid>
    </>
  );
}

export default LeaveForm;