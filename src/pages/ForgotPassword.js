import React, { useMemo, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Untitled
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles({
    linkDesign: {
        textDecoration: 'none',
        "&:visited" : {
            textDecoration: 'none',
            color: 'inherit'
        }    
    }
})

export default function ForgotPassword() {
    // Styles Hook
    const classes = useStyles();

    // Check For Browser Theme Preference
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = useMemo(
        () =>
          createTheme({
            palette: {
              mode: prefersDarkMode ? 'dark' : 'light',
            },
          }),
        [prefersDarkMode],
    );
    

  const emailRef = useRef();
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("")  
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for reset instructions')
    } catch {
      setError("Failed to Reset Password")
    }

    setLoading(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>

            {
                message && 
                <Typography
                  variant="caption"
                  color="green"
                >
                    {message}
                </Typography>
            }

            { error && 
              <Typography
                variant="caption"
                color="red"
              >
                {error}
              </Typography> 
            }

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                inputRef={emailRef}
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                inputRef={passwordRef}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /> */}
              <Button
                type="submit"
                disabled={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login" className={classes.linkDesign} variant="body2">
                    Login
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/Signup' variant="body2" className={classes.linkDesign}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}