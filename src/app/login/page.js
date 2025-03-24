"use client"
import { useState } from "react"
import { useFormState } from "react-dom"
import { login } from "./action"
import { Box, TextField, Button, Typography, Container, Paper, Alert, Grid, Link, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export default function Page() {
  const initState = { message: null }
  const [state, formAction] = useFormState(login, initState)
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (event) => event.preventDefault()

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Sign in to continue to your account
        </Typography>
        <Box component="form" action={formAction} noValidate sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {state?.message && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
              {state.message
                .replace("2 errors occurred", "กรุณากรอกข้อมูลให้ถูกต้อง")
                .replace("Invalid identifier or password", "อีเมลหรือรหัสผ่านไม่ถูกต้อง")}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: "1rem", fontWeight: "bold", bgcolor: "primary.main" }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" sx={{ color: "primary.main" }}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}