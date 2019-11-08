// src/components/NavBar.js

import React, {useEffect} from "react";
import { useAuth0 } from "../utils/react-auth0-wrapper";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function NavBar(props) {
  const { isAuthenticated, loginWithRedirect, loginWithPopup, logout  } = useAuth0();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  function login(){
    props.history.push('/profile')
    loginWithPopup({})
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab onClick={()=> props.history.push('/')} label="Home" />
        <Tab onClick={()=> props.history.push('/profile')} label="Dashboard" />
        {!isAuthenticated && (
        <Button onClick={()=> login()} variant="outlined" color="primary" className={classes.button}>
        Login/Sign Up
      </Button>
      )}
      {isAuthenticated && <Tab onClick={()=> props.history.push('/onboarduser')} label="Onboarding" />}
      {isAuthenticated && <Button onClick={()=> logout()} variant="outlined" color="secondary" className={classes.button}>
        Logout
      </Button>}
      </Tabs>
    </Paper>
  );
}