import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { fire } from '../../servises/firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#11cb5f',
      contrastText: '#fff',
      contrastThreshold: 7,
      tonalOffset: 0.9,
    },
  },
});
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onFinish = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('#### email:', email);
      console.log('#### password:', password);
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('#### res:', res);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('#### errorCode:', errorCode);
          console.log('####errorMessage:', errorMessage);
          setEmail(null);
          setPassword(null);
        });
    } else {
      setEmail(null);
      setPassword(null);
    }

    console.log('#### email:', email);
    console.log('#### password:', password);
  };

  const signUp = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('#### email:', email);
      console.log('#### password:', password);
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('#### errorCode:', errorCode);
          console.log('####errorMessage:', errorMessage);
          setEmail(null);
          setPassword(null);
        });
    } else {
      setEmail(null);
      setPassword(null);
    }

    console.log('#### email:', email);
    console.log('#### password:', password);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="inherit">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={onFinish}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmail}
              onSubmit={onFinish}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePassword}
              onSubmit={onFinish}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // item={finish}
              onClick={onFinish}
            >
              Login
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              // item={finish}
              onClick={signUp}
            >
              Registration
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
